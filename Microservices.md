# What are Microservices?
Microservices are an architectural approach to developing software applications as a collection of small, independent services that communicate with each other over a network.
- Instead of building a `monolithic` application where all the functionality is into a single codebase, `microservices` break down the application into smaller, loosely coupled services.
- Can be written in a variety of programming languages, and frameworks, and each service acts as a mini-application on its own.
- A small, loosely coupled service that is designed to perform a specific business function and each microservice can be developed, deployed, and scaled independently.
  
## How do Microservices work?
- Each microservice handles a particular business feature, like user authentication or product management, allowing for specialized development.
- Services interact via APIs
- Different technologies can be used for each service, enabling teams to select the best tools for their needs
- Microservices can be updated independently, reducing risks during changes and enhancing system resilience.

![img.png](images/img.png)

## Main components of Microservices Architecture
- ***Microservices***: Small, loosely coupled services that handle specific business functions.
- ***API Gateway***: Acts as a central entry point for external clients also they manage requests, authentication and route the requests to the appropriate microservice.
- ***Service Registry and Discovery***: Keeps track of the locations and addresses of all microservices, enabling them to locate and communicate with each other dynamically.
- ***Load Balancer***: Distributes incoming traffic across multiple service instances and prevent any of the microservice from being overwhelmed.
- ***Containerization***:  Docker encapsulate microservices and their dependencies and orchestration tools like Kubernetes manage their deployment and scaling.
- ***Event Bus/Message Broker***: Facilitates communication between microservices, allowing pub/sub asynchronous interaction of events between components/microservices.
- ***Database per Microservice***: Each microservice can have its own database, allowing for data isolation and flexibility in choosing the right database technology for each service.
- ***CI/CD pipeline***: CI/CD pipelines automate the process of moving code updates from development into production
- ***Caching***:  Cache stores frequently accessed data close to the microservice which improved performance by reducing the repetitive queries.

## Real-World Example of Microservices
Amazon’s online store runs on many small, specialized microservices, each handling a specific task.

![img.png](images/img.png)

# Strengths (Pros) vs. Weaknesses (Cons)
| Strengths (Pros)                                                                | Weaknesses (Cons)                                                                      |
|---------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `Scalability`: Individual services can be scaled independently based on demand. |`Complexity`: Managing multiple services,  their deployments, monitoring can be complex. |
| `Flexibility`: Different technologies can be used for different services.       | `Security Complexity`: Managing security across many distinct services.              |
| `Resilience`: Failure in one service does not necessarily affect others.        |`Data Consistency`: Maintaining data consistency across services can be challenging.    |
| `Faster Development`: Teams can work on different services simultaneously.      |`Testing Complexity`: End-to-end testing can be more complex due to service interactions. |
| `Easier Maintenance`: Smaller codebases are easier to manage and update.        |`Debugging Difficulty`: Tracing a request across multiple services and machines is challenging. |
| `Technology Diversity`: Teams can choose the best tools for each service.       |`Security Complexity`: Managing security across many distinct services.       |


# Microservices Communications
***Communication*** in Monolithic applications are ***inter-process communication***.So that means it is working on ***single process*** that invoke one to another by ***using method calls***.

This communication gives is very simple but at the same time components are **highly coupled** with each other and hard to **separate and scale independently.**

**Microservices communicate** with each other by **inter-service communication*** on network level.Each microservice has its 
own instance and process. Therefore, services must interact using an inter-service communication protocols like HTTP, gRPC or message brokers AMQP protocol.

## Microservices Communication Types — Sync or Async Communication
### What is Synchronous communication ?
Synchronous communication is using HTTP or gRPC protocol for returning sync response. The client sends a request and waits 
for a response from the service. So that means client code block their thread, until the response reach from the server.
The synchronous communication protocols can be **HTTP or HTTPS.**

![img.png](images/img.png)

### What is Asynchronous communication ?
Asynchronous communication, the client sends a request but it doesn’t wait for a response from the service
The most popular protocol for this Asynchronous communications is **AMQP (Advanced Message Queuing Protocol).**

![img_1.png](images/img_1.png)
An asynchronous communication also divided by 2 according to implementation. An asynchronous systems can be implemented in a **one-to-one(queue) mode** or **one-to-many (topic) mode.**

In a one-to-one(queue) implementation there is a single producer and single receiver. But in one-to-many (topic) implementation has Multiple receivers. Each request can be processed by zero to multiple receivers. one-to-many (topic) communications must be asynchronous.


# Publisher-Subscriber pattern
The Publisher-Subscriber (Pub/Sub) pattern in microservices enables decoupled, asynchronous communication where publishers send messages (events) to a broker without knowing the subscribers, and subscribers listen to specific topics for messages they care about, receiving them via the broker. 
#### How it Works
- `Publishers`:  Services create messages (e.g., "OrderCreated") and send them to a message broker (like Kafka, RabbitMQ, or AWS SNS/SQS) categorized by a topic.
- `Topics`: These act as channels or categories for messages
- `Message Broker`: The central component that receives messages from publishers and routes them to interested subscribers.
- `Subscribers`: Services subscribe to specific topics, telling the broker they want to receive messages for those topics.
- `Asynchronous Delivery`: Publishers don't wait for subscribers; messages are delivered when subscribers are ready, improving responsiveness. 
#### Key Benefits in Microservices
- `Decoupling`: Publishers and subscribers don't need to know about each other's location or status, promoting autonomy.
- `Scalability & Reliability`: Services can scale independently, and the system handles failures better as messages are persisted by the broker.
- `Flexibility`: Easily add new subscribers or change existing ones without affecting publishers.
- `Event-Driven Architecture`

