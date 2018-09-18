import json
import boto3    #aws library
import io       #is StringIO in python2
import zipfile  #zip utlity 
import mimetypes # will allow us to guess types because AWS doesn't :(


def lambda_handler(event, context):
    # set up globals
    s3 = boto3.resource('s3')
    sns = boto3.resource('sns')

    portfolio_zip = io.BytesIO()
    topic = sns.Topic('arn:aws:sns:us-east-1:629162878034:deployPortfolioSuccessTopic')
    
    location = {
        "bucketName": "portfoliobuild.zaratedev.org",
        "objectKey": "portfolioBuild.zip"
    }
    
    try:
        # get code pipeline job details
        job = event.get("CodePipeline.job")
        
        # we want to get the artifact id from the times we get a invoke call to this lambda function
        # remember we can manually trigger this lambda so we need to check to see if the 'CodePipeline.job'
        # event got sent to this lambda function
        # check https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html
        # for the example JSON object that gets sent
        # "MyAppBuild" Name is the name that is given by codepipeline
        if job:
            for artifact in job["data"]["inputArtifacts"]:
                if artifact["name"] == "MyAppBuild":
                    location = artifact["location"]["s3Location"]
                    
        print("Building portfolio from ", str(location))
        
        # set up s3 bucketes and download as object
        portfolio_bucket = s3.Bucket('portfolio.zaratedev.org')
        build_bucket = s3.Bucket(location["bucketName"])
        build_bucket.download_fileobj(location["objectKey"], portfolio_zip)
        
        # iterate over contents of zip in memory and upload them
        # from my build bucket to my production bucket
        with zipfile.ZipFile(portfolio_zip) as myZip:
            for item in myZip.namelist():
                to_upload_obj = myZip.open(item)
                portfolio_bucket.upload_fileobj(to_upload_obj, item, 
                    ExtraArgs={'ContentType': mimetypes.guess_type(item)[0]})
                # by default uploaded contents are set to private we need to change the 'Access Control List'
                # to enable 'public-read' to make the new uploaded content accessable to the public :)
                portfolio_bucket.Object(item).Acl().put(ACL='public-read') 
        
        print("Deploymet Done!")
        topic.publish(Subject="Portfolio Deployed to AWS", Message="Portfolio deployed successfully!!")
        # so fun fact : Codepipeline has no idea from this lambda function if 
        # the Job got completed successfully, so we need to tell it
        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job["id"])
    except:
        topic.publish(Subject="Portfolio Deployment Failed", Message="There was something wrong with the deployment.  Check the logs on AWS more detail.")
        raise
    return {
        "statusCode": 200,
        "body": json.dumps('Lambda Job Done!!')
    }
