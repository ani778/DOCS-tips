<h1>What is AWS Cloud?</h1>
The AWS Cloud encompasses a broad set of global cloud-based products that includes compute, storage, databases, analytics, networking, mobile, developer tools, management tools, IoT, security, and enterprise applications: on-demand, available in seconds, with pay-as-you-go pricing. With over 200 fully featured services available from data centers globally, the AWS Cloud has what you need to develop, deploy, and operate your applications, all while lowering costs, becoming more agile, and innovating faster.
For example, with the AWS Cloud, you can spin up a virtual machine, specifying the number of vCPU cores, memory, storage, and other characteristics in seconds, and pay for the infrastructure in per-second increments only while it is running. One benefit of the AWS global infrastructure network is that you can provision resources in the Region or Regions that best serve your specific use case. When you are done with the resources, you can simply delete them. With this built-in flexibility and scalability, you can build an application to serve your first customer, and then scale to serve your next 100 million.

<h2>On-premises and cloud computing</h2>
Before the cloud, companies and organizations hosted and maintained hardware in their own data centers, often allocating entire infrastructure departments to take care of their data centers. This resulted in costly operations that made some workloads and experimentation impossible.
The demand for compute, storage, and networking equipment increased as internet use became more widespread. For some companies and organizations, the cost of maintaining a large physical presence was unsustainable. Cloud computing emerged to solve this problem.

<h2>What is cloud computing?</h2>
Cloud computing is the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers and servers, you can access technology services, such as computing power, storage, and databases, on an as-needed basis from a cloud provider like Amazon Web Services (AWS).

Benefits of cloud computing:
 -Agility
 -Elasticity
 -Cost savings
 -Deploy globally in minutes

Types of cloud computing
 -Infrastructure as a Service (IaaS):
	IaaS contains the basic building blocks for cloud IT. It typically provides access to networking features, computers (virtual or on 	dedicated hardware), and data storage space. IaaS gives you the highest level of flexibility and management control over your IT 	resources.
 -Platform as a Service (PaaS):
	PaaS removes the need for you to manage underlying infrastructure (usually hardware and operating systems), and allows you to focus 	on the deployment and management of your applications.
 -Software as a Service (SaaS):
	SaaS provides you with a complete product that is run and managed by the service provider. In most cases, people referring to SaaS 	are referring to end-user applications (such as web-based email). With a SaaS offering, you don’t have to think about how the 	service is maintained or how the underlying infrastructure is managed. You only need to think about how you will use that particular 	software.


<h2>AWS Lambda</h2>
AWS Lambda empowers you to focus solely on your code, while it handles all infrastructure management, enabling faster development, improved performance, enhanced security, and cost efficiency.

Benefits of AWS Lambda:
 -Increase developer agility(Write less code, perform less maintenance, and build applications faster.)
 -Boost application performance
 -Help strengthen overall security posture
 -Drive cost efficiency

Use cases
 -Interactive web and mobile backends:
	Web and mobile applications often contain sophisticated features like authentication, geo-hashing, and real-time messaging, mostly 	built as distributed microservices-based systems. These applications must respond almost in real time to customer activity and 	scale seamlessly to meet unpredictable demands all while maintaining robust security. With AWS Lambda, you can build and operate 	powerful web and mobile back-ends that deliver consistent, uninterrupted service to end users by automatically scaling up and down 	based on real-time needs. You can enhance application functionalities by easily connecting them to other systems or modifying 	components without re-architecting the entire system.
 -Batch data processing:
	Batch data processing tasks often require substantial compute and storage resources to handle large volumes of information for 	short periods.
 -Real-time data processing
 -Generative AI:
	The generative AI landscape is evolving rapidly, and organizations need to innovate and adapt quickly to maintain competitive 	advantage. This evolution is catalyzed by a significant surge in large language models (LLMs) that meet diverse needs. 	Organizations are building distributed architectures that leverage specific LLMs based on unique requirements. AWS serverless 	architecture, powered by AWS Lambda, is ideal for generative AI applications, enabling you to start small and scale seamlessly 	while handling distributed, event-driven workflows securely at scale.


<h2>AWS Cloud Development Kit (AWS CDK)</h2>
 AWS CDK, a framework for defining cloud infrastructure in code and provisioning it through AWS CloudFormation.
The AWS CDK lets you build reliable, scalable, cost-effective applications in the cloud with the considerable expressive power of a programming language. This approach yields many benefits, including:
	-Build with high-level constructs that automatically provide sensible, secure defaults for your AWS resources, defining more 			infrastructure with less code.
	-Use programming idioms like parameters, conditionals, loops, composition, and inheritance to model your system design from 			building blocks provided by AWS and others.
	-Put your infrastructure, application code, and configuration all in one place, ensuring that at every milestone you have a 			complete, cloud-deployable system.
	-Employ software engineering practices such as code reviews, unit tests, and source control to make your infrastructure more 			robust.
	-Connect your AWS resources together (even across stacks) and grant permissions using simple, intent-oriented APIs.
	-Import existing AWS CloudFormation templates to give your resources a CDK API.
	-Use the power of AWS CloudFormation to perform infrastructure deployments predictably and repeatedly, with rollback on error.
	-Easily share infrastructure design patterns among teams within your organization or even with the public.

<h2>How it works</h2>
The AWS CDK supports TypeScript, JavaScript, Python, Java, C#/.Net, and Go. Developers can use one of these supported programming languages to define reusable cloud components known as Constructs. You compose these together into Stacks and Apps.

