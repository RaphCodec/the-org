# The Org

This repo contains a fully functional Organizational Chart Application. The purpose of the application is to easily display the structure of an organization and for a user (such as a personnel or HR employee) to propose new organizational structures.


 The project is based on the fantastic [d3-org-chart](https://github.com/bumbeishvili/org-chart) JavaScript package built by Github User [bumbeishvili](https://github.com/bumbeishvili).

## Features

- Interactive organizational chart visualization
- Dark/light mode switching
- Drag and drop functionality for reorganizing
- Search capability to quickly find employees
- Zoom, rotate, and fit chart to view
- Show/hide salaries
- View lineage and sub-hierarchies
- Export as PNG, SVG, or JSON data
- Edit, add, or remove nodes
- View by organizational levels

## Folder Structure

```
the-org/
├── app/                          # Main application directory
│   ├── data/                     # Data management
│   │   └── makedb.py             # Creates SQLite database with sample data
│   ├── routers/                  # FastAPI route handlers
│   │   ├── hierarchy.py          # API endpoints for org hierarchy data
│   │   └── views.py              # Web page rendering endpoints
│   ├── static/                   # Static assets
│   │   ├── css/                  # CSS files
│   │   │   ├── input.css         # TailwindCSS source
│   │   │   └── output.css        # Compiled CSS
│   │   ├── img/                  # Images and icons
│   │   │   └── favicon_io/       # Favicon files
│   │   └── js/                   # JavaScript files
│   │       ├── chart_view.js     # Chart viewing controls
│   │       ├── darkmode.js       # Theme switching
│   │       ├── dragDrop.js       # Drag and drop functionality
│   │       ├── exports.js        # Export functionality
│   │       ├── lineage.js        # Lineage visualization
│   │       ├── nodes.js          # Node management
│   │       ├── org.js            # Core chart initialization
│   │       └── search.js         # Search functionality
│   ├── templates/                # HTML templates
│   │   └── index.html            # Main application page
│   ├── .env                      # Environment variables
│   ├── database.py               # Database connection setup
│   ├── main.py                   # FastAPI application entry point
│   └── models.py                 # SQLModel data models
├── .vscode/                      # VSCode settings
│   └── settings.json             # Terminal restoration config
├── package.json                  # NPM dependencies
├── pyproject.toml                # Python project configuration
└── README.md                     # Project documentation
```

## Setup

### Prerequisites

- Node.js and [npm](https://nodejs.org/en/download)
- [uv](https://docs.astral.sh/uv/getting-started/installation/) (Python package installer)

### Development Environment Setup

In order to run the DEV environment two terminals are needed to run FastAPI and Tailwind/NPM at the same time.  The terminals can be run manually or by using the VS Code restore terminals extension.

#### Running with VSCode Restore Terminals (Recommended if using VS Code)

1. Install [Restore Terminals Extension](https://marketplace.visualstudio.com/items?itemName=EthanSK.restore-terminals) if needed

2. Open the VS Code Command Pallette

3. Run the "Restore Terminals" Command

4. Open your browser and navigate to `http://localhost:8000`

#### Manual

1. Clone the repository:
   ```bash
   git clone https://github.com/RaphCodec/the-org.git
   cd the-org
   ```

2. Run the DEV FastAPI App:
   ```bash
   uv run fastapi dev
   ```

3. Install Node.js dependencies in a seperate terminal:
   ```bash
   npm install
   ```

4. Create and populate the database:
   ```bash
   npx @tailwindcss/cli -i app/static/css/input.css -o app/static/css/output.css --watch
   ```

5. Open your browser and navigate to `http://localhost:8000`

### Production Deployment

Included in this repository is a Dockerfile to run the application in a production environment.

1. (Optional) If you need to connect to production data, alter the database and models files in the FastAPI Python scripts. Be aware that any changes to the models will need to be reflected in the HTML and JavaScript for the application to work. Notably, the org.js and nodes.js files will have to be updated.

2. Ensure that the `.venv` and `node_modules` folders are deleted (if they exist) before building the Dockerfile:
   Mac/Linux:
   ```bash
   rm -rf .venv node_modules
   ```
   Windows Powershell:
   ```powershell
   Remove-Item -Recurse -Force .venv, node_modules
   ```

3. Build the Docker image:
   ```bash
   docker build -t the-org:v0.1.0 .
   ```

4. Run the production container:
   ```bash
   docker run -p 8000:8000 the-org:v0.1.0
   ```

5. Open your browser and navigate to `http://localhost:8000`

## Usage

- **View Controls**: Use the Chart View section to zoom, rotate, or fit the chart to your screen
- **Node Management**: Select a node and use the Actions section to edit, add, or remove nodes
- **Organization**: Use drag and drop to reorganize the chart hierarchy
- **Search**: Use the search box in the top navbar to find employees by name
- **Exporting**: Export the chart as PNG, SVG, or JSON data using the Export section

## Technologies Used

- **Backend**: FastAPI, SQLModel, SQLite
- **Frontend**: JavaScript, D3.js, d3-org-chart
- **Styling**: TailwindCSS, DaisyUI
- **Development**: VSCode, Restore Terminals, UV
- **Production**: Docker, UV
