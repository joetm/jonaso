provider "aws" {
  region = "us-east-1"
  profile = "oracleingest"
}

resource "aws_vpc" "myvpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
}

resource "aws_internet_gateway" "my_internet_gateway" { vpc_id = aws_vpc.myvpc.id }

resource "aws_security_group" "allow_ssh_https" {
  name        = "allow-ssh-https"
  description = "Allow SSH and HTTPS traffic"
  vpc_id      = aws_vpc.myvpc.id
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id            = aws_vpc.myvpc.id
  cidr_block        = "10.0.1.0/24"
  map_public_ip_on_launch = true  # This attribute is used for enabling public IP assignment
}

resource "aws_instance" "ingestinstance" {
  ami           = "ami-0b765f451ebbde312"  # Deep Learning AMI GPU PyTorch 2.0.1 (Ubuntu 20.04)
  instance_type = "t2.xlarge"
  key_name      = "ec2access" # aws_key_pair.keyinfo.key_name
  vpc_security_group_ids = [aws_security_group.allow_ssh_https.id]
  subnet_id = aws_subnet.public_subnet.id  # Associating the subnet
  root_block_device {
    volume_size = 75
    volume_type = "gp2"
  }
  tags = { Name = "oracle-ingest" }
}

output "public_ip" { # echo the IP
  value = aws_instance.ingestinstance.public_ip
  description = "The public IP of the EC2 instance"
}
