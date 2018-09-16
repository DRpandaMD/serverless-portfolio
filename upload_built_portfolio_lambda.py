import json
import boto3    #aws library
import io       #is StringIO in python2
import zipfile  #zip utlity 
import mimetypes # will allow us to guess types because AWS doesn't :(


def lambda_handler(event, context):
    # set up globals
    s3 = boto3.resource('s3')
    portfolio_zip = io.BytesIO()
    
    # set up s3 bucketes and download as object
    portfolio_bucket = s3.Bucket('portfolio.zaratedev.org')
    build_bucket = s3.Bucket('portfoliobuild.zaratedev.org')
    build_bucket.download_fileobj('portfolioBuild.zip', portfolio_zip)
    
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

        
    return {
        "statusCode": 200,
        "body": json.dumps('Hello from Lambda!')
    }

