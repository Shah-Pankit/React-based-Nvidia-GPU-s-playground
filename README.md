NVIDIA GPU Explorer
An interactive web application built with React and D3.js, styled with Tailwind CSS, designed to help users explore and compare NVIDIA GPUs across different architectures, series, use cases, and timelines. This tool provides a detailed view of each GPU's specifications, power consumption, and primary purposes (Gaming vs. Deployment & Development).

✨ Features
Comprehensive GPU Data: View a curated list of NVIDIA GPUs, including popular models for gaming, professional workstations, and data center/cloud deployments (like AWS).

Purpose-Driven Filtering: Easily filter GPUs based on their primary purpose: "Gaming" or "Deployment & Development" (including server, AI/ML, and cloud usage).

Interactive Timeline: Visualize the release history of GPUs, allowing you to track architectural advancements over time.

Dynamic Hierarchy/Tree View: Explore the hierarchical structure of NVIDIA GPUs by architecture and series, with the tree adapting dynamically to applied filters.

Detailed View Panel: Get in-depth information about a selected GPU, including CUDA Cores, VRAM, memory bus, power consumption (TDP & typical usage), and specific use cases.

Search Functionality: Quickly find any GPU by name.

Responsive Design: Optimized for seamless viewing and interaction across various devices (desktop, tablet, mobile).

🚀 Technologies Used
React: A JavaScript library for building user interfaces.

D3.js: A powerful JavaScript library for data visualization.

Tailwind CSS: A utility-first CSS framework for rapid and responsive UI development.

📦 Project Structure
my-nvidia-explorer/
├── public/
│   └── index.html             # Main HTML file, entry point for the browser
├── src/
│   ├── app.js                 # Your main React application component
│   ├── index.js               # React entry point, renders App into index.html
│   └── index.css              # Main CSS file, imports Tailwind directives
├── package.json               # Defines project dependencies and scripts
└── tailwind.config.js         # Tailwind CSS configuration

⚙️ Getting Started (Local Development)
To run this project on your local machine, follow these steps:

Clone the Repository:

git clone https://github.com/Shah-Pankit/React-based-Nvidia-GPU-s-playground.git
cd React-based-Nvidia-GPU-s-playground

Install Dependencies:

npm install
# OR
yarn install

Start the Development Server:

npm start
# OR
yarn start

This will open the application in your browser at http://localhost:3000 (or another available port).

☁️ Deployment (Vercel)
This application is configured for easy deployment to Vercel.

Install Vercel CLI (if you haven't already):

npm install -g vercel

Log in to Vercel:

vercel login

Follow the prompts to log in via your email.

Deploy from Project Directory:
Navigate to the root directory of your project (where package.json is located) in your terminal and run:

vercel

Follow the CLI prompts. Vercel will automatically detect that it's a React application, build it, and deploy it. It will provide you with a live URL upon successful deployment.

Connect to GitHub (Recommended for Continuous Deployment):
For automatic deployments on every push to your GitHub repository:

Go to your Vercel Dashboard.

Click "Add New..." -> "Project".

Choose "Import Git Repository" and select the GitHub repository where you've pushed this project.

Vercel will automatically configure the build settings for a React app. Click "Deploy".
Now, every time you push changes to your main (or master) branch, Vercel will automatically build and deploy the updates.

💡 Future Enhancements
Expand GPU Data: Add more historical and current NVIDIA GPUs, including mobile GPUs, older workstation cards, and server GPUs not yet included.

Dynamic Data Loading: Implement fetching GPU data from a real API or a larger JSON file to avoid hardcoding in app.js.

Performance Benchmarks: Include data on gaming performance (FPS) or AI benchmark results.

Price Information: Add current market prices or launch prices for comparison.

Image Assets: Display actual GPU images in the detailed view.

Advanced Data Visualization: Explore more complex D3.js visualizations, such as parallel coordinates for multi-variable comparison or interactive scatter plots.

User Favorites/Comparison: Allow users to mark favorite GPUs or compare multiple GPUs side-by-side.

Accessibility Improvements: Ensure the application is fully accessible to users with disabilities.

🚀 Deployed at : 🚀 https://react-based-nvidia-gpu-s-playground.vercel.app/

Feel free to contribute, open issues, or suggest further improvements!