# Smart Stadium Operations Manager (SM)

An advanced, interactive, multi-role operations dashboard designed for modern stadium event management. This platform serves as a "Digital Twin" and dynamic command hub, offering real-time telemetry, automated decision support, AI-driven briefings, and localized coordination for stadium personnel, volunteers, and fans.

---

## 🌟 Key Features & Role-Based Workflows

The platform is designed to be dynamically filtered by user personas, providing targeted interfaces for different stadium roles:

### 1. 🏢 Command Center (Organizer View)
*   **Live KPI Telemetry**: High-contrast, interactive counters for spectator capacity, average gate wait times, real-time threat/security levels, solar microgrid outputs, volunteer engagement, and concessions revenue.
*   **Dynamic Operations Traffic Analysis**: Smooth, native SVG area-graphs tracing live peak-arrival curves and forecasted entry congestion.
*   **AI Executive Briefing**: Automatic multi-agent status summarization with simulation overlays.
*   **Decision Support System**: Actionable intelligence board allowing organizers to dispatch emergency crews, toggle overflow turnstiles, and re-route traffic with live system toast responses.

### 2. 🏟️ Digital Twin (Interactive Stadium Map)
*   **Spectator Heatmap Overlay**: Live 2D stadium diagram dynamically displaying seat block densities, gate points, and spectator locations.
*   **Interactive Block Inspection**: Select individual sectors to query block occupancy rates, current queue times, and structural safety flags.
*   **Continuous Simulation Engine**: Active animation cycles modeling realistic spectator ingress/egress.

### 3. 📹 CCTV Vision Panel (Security View)
*   **Multi-Feed Video Feeds**: Switch between high-fidelity interactive camera channels (Gates, Concourse, Seating).
*   **AI Computer Vision Overlays**: Real-time bounding box highlights for crowd density tracking, suspicious activity detection, and safety obstructions.
*   **OCR Signage Translator**: Select target languages (Spanish, German, French) and run optical character recognition queries to instantly translate concourse wayfinding signs.

### 4. 🧭 Fan Concierge (Spectator View)
*   **Digital Match Tickets**: Integrated Group Stage tickets showing detailed gate assignments, row details, and seat coordinates.
*   **Dynamic Routing Guide**: Interactive directions map helping fans navigate step-by-step from gates to seat rows.
*   **Restroom Occupancy Monitors**: Live waiting times and congestion loads across all sector concourses.
*   **F&B Dietary Menu Filters**: Interactive concessions directory sorted by Vegan, Vegetarian, and Gluten-Free filters.

### 5. 🍃 Sustainability & Smart Grid Monitor
*   **Renewable Energy Smart Grid**: Telemetry monitoring solar generation (kW) and auxiliary battery storage reserves.
*   **Dynamic HVAC Controls**: Smart suite temperature overrides and low-flush smart water grid pressure readings.
*   **Waste Recycling Predictors**: Level alerts for trash, recycling, and organic bins prompting immediate dispatch.

### 6. 🤝 Volunteer Desk (Coordinator View)
*   **Incident Checklist**: Real-time task manager allowing coordinators to dispatch volunteers to cleanups, medical assists, or lost-and-found items.
*   **Multilingual Translation Portal**: Instantly translate stadium instructions and coordinate with international volunteers.

### 7. 🤖 Autonomous AI Agent Logs
*   **Simulated AI Co-ordination**: Dynamic log feed displaying decisions and alerts issued autonomously by Safety, Transit, Energy, and Experience agents.

---

## 🛠️ Architecture & Tech Stack

*   **Frontend**: React 18+ with TypeScript (configured with Vite).
*   **Styling**: Modern, responsive Tailwind CSS featuring a futuristic high-contrast slate theme, subtle glows (`glow-cyan`, `glow-indigo`), and native glassy overlays (`glass-panel`).
*   **Icons**: Lucide React.
*   **Animations**: Direct, lightweight CSS utility frames and layout transitions for robust performance under heavy browser workloads.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm (v10+)

### Development Server
To launch the developer workspace and preview the application locally:
```bash
npm run dev
```
The application will run on port `3000` under `http://localhost:3000`.

### Building for Production
To package the app for production deployment:
```bash
npm run build
```
The compiled assets will be built inside the `/dist` folder.
