# Damn-Vulnerable-Ecommerce-API
This E-Commerce API is intentionally vulnerable for testing and educational purposes. It allows interaction with an eCommerce platform where multiple vulnerabilities have been introduced to simulate real-world scenarios for security testing.
#### Features
* User authentication and registration
* Product browsing and purchasing
* Apply coupon for discount
* Image uploads for profile customization
* Add, Edit and Delete products

#### Security Issues:
1. Price Misconfiguration in checkout process
2. Purchase History Nosql Injection [Exposes Email + IDOR]
3. 2 ATO Bugs via Pass Reset
4. SSRF in image upload
5. Products add, edit, delete without proper without authorization

#### Step-by-Step Docker Installation
**1. Clone the Repository:**
```
git clone https://github.com/rootxsudip/Damn-Vulnerable-Ecommerce-API
cd Damn-Vulnerable-Ecommerce-API
```
**2. Create the .env File**
Set up the environment variables required by the application. In the root of the project directory, create a .env file with the following contents:
```
# Database connection string
CONNECTION_STRING=mongodb://mongo:27017/damn_vulnerable_ecommerce
```
**3. Build and Start the Application with Docker Compose**
To build and start the application and its dependencies using Docker, use the following command:
```
docker compose up --build
```
This will:
* Build the API from the Dockerfile.
* Pull the MongoDB image if it’s not available locally.
* Start the containers (API and MongoDB).
* Once the services start, the API will be available at http://localhost:5001.

#### Useful docker commands:
1. Stop and Remove Containers:
```
docker-compose down
```
2. Rebuild Containers:
If you make any changes to the application code or configuration, you can rebuild the containers with:
```
docker-compose up --build
```