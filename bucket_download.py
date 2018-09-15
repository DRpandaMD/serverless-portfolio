import boto3

s3 = boto3.resource('s3')

portfolio_bucket = s3.Bucket('portfolio.zaratedev.org')

for obj in portfolio_bucket.objects.all():
    print(obj.key)

build_bucket = s3.Bucket('portfoliobuild.zaratedev.org')

build_bucket.download_file('portfolioBuild.zip', '/tmp/portfolioBuild.zip')

