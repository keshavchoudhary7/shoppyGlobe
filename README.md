# ShoppyGlobe E-commerce Application 🌍  

ShoppyGlobe is a feature-rich, full-stack e-commerce application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project showcases modern web development practices, emphasizing component-based architecture, efficient state management, and responsive design for an intuitive shopping experience.

## Features ✨  

- User-Friendly Interface: Clean, responsive design for seamless navigation.  
- Product Management: Display products dynamically fetched from the database.  
- State Management: Efficient state handling using Redux.  
- Authentication: User registration, login, and authentication using JWT.  
- Search & Filter: Search bar and advanced filtering for easier product discovery.  
- Shopping Cart: Add to cart, update quantities, and remove items.  
- Checkout: Integrated payment gateway for a smooth checkout process.  
- Admin Panel: Admin functionalities for managing products, orders, and users.  
- Performance Optimization: Optimized for fast loading and smooth performance.  

## Tech Stack 🛠️  

- Frontend: React.js, Redux, Tailwind CSS  
- Backend: Node.js, Express.js  
- Database: MongoDB  
- API Integration: RESTful API for seamless communication between the client and server  

## Installation & Setup 🚀  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/keshavchoudhary7/shoppyglobe.git  
   ```  

2. Navigate to the project directory:  
   ```bash  
   cd shoppyglobe  
   ```  

3. Install dependencies for both frontend and backend:  
   ```bash  
   cd client  
   npm install  
   cd ..
   npm install  
   ```  

4. Set up environment variables:  
   - Create a `.env` file in the `server` directory.  
   - Add the following variables:  
     ```  
     MONGO_URI=your_mongodb_connection_string  
     JWT_SECRET=your_jwt_secret  
     PAYMENT_GATEWAY_KEY=your_payment_gateway_key  
     ```  

5. Start the development servers:  
   - Run the backend:  
     ```bash  
     cd server  
     npm start  
     ```  
   - Run the frontend:  
     ```bash  
     cd client  
     npm start  
     ```  

6. Open your browser and navigate to `http://localhost:3000`.  

## Folder Structure 📂  

- /client: Contains React frontend code.  
- /server: Contains Express backend code.  
- /models: MongoDB schemas for products, users, and orders.  
- /routes: API endpoints for user, product, and order management.  
- /controllers: Business logic for the API.  
- /middleware: Middleware for authentication and error handling.  

## Screenshots 📸  

 To be added soon......

## Contribution Guidelines 🤝  

Contributions are welcome! To contribute:  

1. Fork the repository.  
2. Create a new branch (`feature/your-feature-name`).  
3. Commit your changes.  
4. Push to your branch and submit a pull request.  

## Author 👨‍💻  

Developed by [Keshav Kumar Choudhary](https://github.com/keshavchoudhary7).  

## License 📝  

This project is licensed under the MIT License.  

---

Let me know if you’d like to customize or add more details!
