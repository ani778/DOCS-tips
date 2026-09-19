# Node.js modes

**Node.js modes** usually refers to one of three distinct systems: `Module Systems, Environment Modes, or Stream Execution Modes.`
1. **Module Systems (How code is imported/exported)**
<img width="808" height="418" alt="image" src="https://github.com/user-attachments/assets/205d3c75-ce22-4937-984b-c8d4f47d82a1" />

2. **Environment Modes (Deployment settings)**
   - **Development Mode (NODE_ENV=development)**: The default setting
   - **Production Mode (NODE_ENV=production)**
3. **Stream Modes (Data handling)**
When working with the `Stream API` (e.g., reading large files), Node.js operates in two reading modes:
  - **Flowing Mode**: Data is read from the underlying system automatically
  - **Paused Mode:** Data remains in the stream buffer. The application must explicitly call the stream.read() method to pull chunks of data out.
