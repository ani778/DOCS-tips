# Amazon Elastic Compute Cloud (EC2)
EC2 is a  web service that provides secure, resizable compute capacity in the cloud.It eliminate your needfor up-front hardware investment so you can develop and deploy app faster.

You can use EC2 to launch as many, or as few virtual servers as you need.

EC2 enables you to scale up or down within minutes to handle changes or spikes in requirements, reducing your need to forcast traffic.

EC2 is hosted in multiple locations world-wide comprised of AWS Regions, which consists of at least 3 availablity zones.

Security at AWS is our top priority. AWS is built to meet requirements of the most security-sensitive organazations.


## Amazon ec2 Basics
### Instances
An EC2 instance is a virtual server in the AWS cloud. It is a compute resource that you can use to run applications and services. 

EC2 provides a wide selection of instance types to enable you to choose the CPU, memory, storage, network capacity, and GPU for your applications.

#### Instance type categories:
- `General purpose`: instances are provide a balance, of compute, memory, and networking resources.
- `Compute optimized`: instances are optimized for compute intensive workloads.
- `Memory optimized`: instances are for memory-intensive workloads thet process large data sets in memory.
- `Storage optimized`: instances are designed for workloads that require high, sequential read and write access to very large data sets on local storage.
- `Accelerated computing`: instances use hardware accelerators.
- `High performance computing (HPC)`: instances are designed for high performance computing workloads.

### AMI (Amazon Machine Image)
Provides the information required to launch an instance. It is a template that contains a software configuration such as
an operating system, applications, and an application server.

### Storage
Instanses can attached storage thate are physically attached to the host computer. This disk storage is referred as instance dtore,
wich provide temporary block-level storage for your instance.

You can also attach an Amazon Elastic Block Storage, or EBS. EC2 also uses Amazon S3 for storing Amazon Machine Images, or AMIs.

Amazon Elastic File System, provides scalable file storage. Apps running on your EC2 instances can access your file system at the same time.


### Networking
Amazon Virtual Private Cloud or VPC, lets you provision a logically isolated area within the AWS Cloud,
were you can launch your EC2 instances in a virtual network that you define.

Alternatively your AWS account comes with a default VPC in each region.
VPC can also span multiple AZ in a region.
You can use multiple layers of security to help control access to Amazon EC2 instansec in each subnet

