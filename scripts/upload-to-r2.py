#!/usr/bin/env python3
"""Upload images to Cloudflare R2 for use in blog posts.

Usage:
    python scripts/upload-to-r2.py path/to/image.jpg [--prefix blog/my-article]

Outputs the public URL to paste into React components.
All credentials come from .env — never hard-coded.
"""

import argparse
import mimetypes
import os
import sys
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

REQUIRED_ENV = [
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET_NAME",
]


def get_config():
    missing = [k for k in REQUIRED_ENV if not os.environ.get(k)]
    if missing:
        print(
            f"Error: Missing environment variables: {', '.join(missing)}",
            file=sys.stderr,
        )
        print("Copy .env.example to .env and fill in R2 credentials.", file=sys.stderr)
        sys.exit(1)

    return {
        "account_id": os.environ["R2_ACCOUNT_ID"],
        "access_key": os.environ["R2_ACCESS_KEY_ID"],
        "secret_key": os.environ["R2_SECRET_ACCESS_KEY"],
        "bucket": os.environ["R2_BUCKET_NAME"],
        "public_url": os.environ.get("PUBLIC_R2_PUBLIC_URL", ""),
    }


def upload_file(file_path: Path, prefix: str):
    import boto3

    config = get_config()
    endpoint = f"https://{config['account_id']}.r2.cloudflarestorage.com"

    s3 = boto3.client(
        "s3",
        endpoint_url=endpoint,
        aws_access_key_id=config["access_key"],
        aws_secret_access_key=config["secret_key"],
        region_name="auto",
    )

    key = f"{prefix}/{file_path.name}" if prefix else file_path.name
    content_type = mimetypes.guess_type(str(file_path))[0] or "application/octet-stream"

    print(f"Uploading {file_path.name} → {key}")
    s3.upload_file(
        str(file_path),
        config["bucket"],
        key,
        ExtraArgs={"ContentType": content_type},
    )

    public_url = f"{config['public_url'].rstrip('/')}/{key}"
    print(f"\n✓ Uploaded successfully!")
    print(f"  Public URL: {public_url}")
    print(f"\n  React usage:")
    print(f'  <img src="{public_url}" alt="" />')
    return public_url


def main():
    parser = argparse.ArgumentParser(description="Upload images to Cloudflare R2")
    parser.add_argument("file", type=Path, help="Path to the file to upload")
    parser.add_argument(
        "--prefix", default="", help="Key prefix (e.g., blog/my-article)"
    )
    args = parser.parse_args()

    if not args.file.exists():
        print(f"Error: File not found: {args.file}", file=sys.stderr)
        sys.exit(1)

    upload_file(args.file, args.prefix)


if __name__ == "__main__":
    main()
