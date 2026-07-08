import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of GoogleGenAI
let ai: any = null;
function getAI() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return ai;
}

// -----------------------------------------------------------------------------
// STADIUM MIND AI AGENT KNOWLEDGE & RULES
// -----------------------------------------------------------------------------
const STADIUM_KNOWLEDGE = `
You are an advanced AI Agent operating within StadiumMind AI, the Smart Stadium Operating System for the FIFA World Cup 2026.
The venue is "StadiumMind Arena" (MetLife Stadium, New York/New Jersey), hosting World Cup 2026 matches.
Capacity: 82,500. Matches feature high-profile national teams (e.g., USA vs Argentina, Mexico vs Germany).

Active Agents in the ecosystem:
1. Navigation Agent: Specializes in seat routing, gates, dynamic crowd rerouting, and wheelchair-accessible paths.
2. Crowd Intelligence Agent: Specializes in crowd densities, queue prediction, entrance bottlenecks, and concession stand loads.
3. Emergency Agent: Coordinates medical dispatches, SOS alerts, fire protocols, and dynamic evacuation instructions.
4. Security Agent: Monitors CCTV feeds, weapon/baggage anomaly detection, fence breaches, and authorized personnel access.
5. Sustainability Agent: Optimizes smart power grids, solar roof, waste recycling, HVAC efficiency, and concessions composting.
6. Transportation Agent: Controls NJ Transit train dispatches, bus shuttles, parking lots A-K, and rideshare zone routing.
7. Accessibility Agent: Focuses on audio-cues, sensory-friendly rooms, wheelchair helpers, and step-free navigation.
8. Organizer Agent: Summarizes stadium performance, active tasks, financial yields, and writes live 5-minute Executive Briefings.

Respond to queries with a professional, operational, and objective tone, tailored to the specific agent selected. Include quantitative data (e.g. queue waits, coordinates, gate names) where applicable to feel incredibly authentic and ready. Keep responses concise (under 120 words).
`;

const AGENT_PROMPTS: Record<string, string> = {
  navigation: "You are the StadiumMind Navigation Agent. Help users navigate the stadium. E.g., Gate A is north, Gate B is east, VIP suite is Sector C level 2. Give precise step-by-step guidance.",
  crowd: "You are the StadiumMind Crowd Intelligence Agent. Answer queue-time queries, entrance loads, or hotspot densities. Suggest alternative entrances or concessions with shorter lines (e.g., Sector B Hot Dog stall has a 4-minute wait vs 18-minute wait at Sector A).",
  emergency: "You are the StadiumMind Emergency Agent. Respond to SOS alerts, medical incidents, and evacuation plans. Be direct, authoritative, and helpful, indicating responder ETA or evacuation directions.",
  security_agent: "You are the StadiumMind Security Agent. Analyze CCTV alerts, suspicious behavior, unattended luggage, and unauthorized zones. Give security protocol instructions or reports.",
  sustainability_agent: "You are the StadiumMind Sustainability Agent. Guide on solar generation, smart HVAC setpoints (recommend 22°C), recycling bins, carbon offsets, and reducing plastic waste. Report green stats.",
  transportation: "You are the StadiumMind Transportation Agent. Provide transit updates, parking lot availability (Lot G is 92% full, Lot K is 40% full), NJ Transit schedule dispatches, and shuttle updates.",
  accessibility: "You are the StadiumMind Accessibility Agent. Help senior, low-vision, or wheelchair-bound guests. Detail step-free paths, sensory rooms (Sector A, Suite 104), and how to page a helper.",
  organizer_agent: "You are the StadiumMind Organizer Agent. Help operations managers analyze KPIs, volunteer allocations, revenue reports, and general summaries of stadium health."
};

// API Endpoint for AI Chat Proxying
app.post("/api/gemini/chat", async (req, res) => {
  const { message, agentId, history } = req.body;

  try {
    const aiClient = getAI();
    const systemPrompt = `${STADIUM_KNOWLEDGE}\n\n${AGENT_PROMPTS[agentId] || "You are StadiumMind Concierge."}`;

    if (!aiClient) {
      // Return a simulated high-quality response if no API key is set
      return res.json({
        text: getMockResponse(message, agentId),
        simulated: true,
      });
    }

    // Call Gemini 3.5 Flash
    const chatSession = aiClient.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const response = await chatSession.sendMessage({ message });
    res.json({
      text: response.text,
      simulated: false,
    });
  } catch (err: any) {
    console.error("Gemini API call failed:", err);
    // Graceful fallback to mock data
    res.json({
      text: getMockResponse(message, agentId) + " [Simulated Response due to server API fallback]",
      simulated: true,
      error: err.message,
    });
  }
});

// Helper for high-quality mock responses
function getMockResponse(message: string, agentId: string): string {
  const query = message.toLowerCase();

  switch (agentId) {
    case 'navigation':
      if (query.includes('seat') || query.includes('gate') || query.includes('find')) {
        return "📍 **Navigation Dispatch:** Your seat (Sector C, Row 12, Seat A22) is closest to **Gate 3 (East Gate)**. To get there step-by-step: enter through the East turnstiles, take the Sector C escalator to Level 2, and turn right. Accessible step-free elevators are located directly on your left as you clear the turnstiles.";
      }
      return "📍 **Navigation Guide:** I can direct you to any location in StadiumMind Arena. Gates 1 & 2 are North (Fast Egress), Gates 3 & 4 are East/South. Express escalators are active on the West Promenade. Just specify your seat coordinates!";

    case 'crowd':
      if (query.includes('crowd') || query.includes('queue') || query.includes('line') || query.includes('gate')) {
        return "📊 **Crowd Update:** Current gate status shows high density at **Gate C (35-minute wait)** due to transit surges. **Gate A (North)** is clear with a **4-minute wait time**. Dynamic routing has been updated on fan devices to direct ingress traffic north. Concession lines in Sector B are at 10% capacity (approx 3 min wait).";
      }
      return "📊 **Crowd Intelligence:** General occupancy is currently at 94.2% (77,716 fans in-seat). Ingress bottlenecks are clearing. Dynamic flow-lines show standard pedestrian speed (1.4m/s) across the grand promenade.";

    case 'emergency':
      if (query.includes('medical') || query.includes('hurt') || query.includes('sos') || query.includes('help')) {
        return "🚨 **Emergency Dispatch ACTIVE:** First Aid Team Bravo-3 has been notified. Location: Sector C Seating, Row 12, Seat A22. ETA is 1 minute 45 seconds. Responders are carrying a mobile defibrillator and basic life support. Clearing accessible elevator #4 for priority transfer if required.";
      }
      return "🚨 **Emergency Agent:** All security gates and medical tents are fully staffed. In the event of an anomaly, select SOS on the visual dashboard to deploy immediate local field responders to your GPS position.";

    case 'security_agent':
      if (query.includes('bag') || query.includes('suspicious') || query.includes('unattended')) {
        return "🔒 **Security Alert:** Camera ID #CCTV-04 detects an unattended black backpack near **Sector B Gate 2**. Bounding boxes have highlighted the item. Security Team Charlie has been dispatched for physical inspection. Expected arrival in 40 seconds. Incident logged as SEC-402.";
      }
      return "🔒 **Security Intelligence:** CCTV feeds are running live weapon-detection and restricted-area intrusion detection. Gate 1 access is restricted to verified VIP and workforce credentials only. Defcon Level: Normal.";

    case 'sustainability_agent':
      if (query.includes('power') || query.includes('energy') || query.includes('waste') || query.includes('solar')) {
        return "🌿 **Sustainability Report:** StadiumMind Solar Canopy is generating 420kW, feeding 15% back to local grid storage. Smart HVAC setpoints in suites are optimized at 22.5°C, reducing cooling loads by 12%. Recycling rate is 78.4% today, with organic compost bins near concessions reporting 40% volume. Recommend waste collectors service Sector D bins.";
      }
      return "🌿 **Sustainability Agent:** We are monitoring carbon levels and water grid pressures. Total offset for today's match is calculated at 14.2 Tons of CO2 via localized smart lighting and recycling. Help us reach our zero-waste target!";

    case 'transportation':
      if (query.includes('train') || query.includes('metro') || query.includes('parking') || query.includes('transit')) {
        return "🚌 **Transportation Hub Update:** NJ Transit train departures from Secaucus are running on schedule every 6 minutes. Parking Lot G is **96% full**; routing remaining vehicles to Lot K (42% capacity). Local rideshare pickup zones in Lot D are experiencing high congestion; dynamic shuttle frequency has been increased by 20% to relieve queue pressure.";
      }
      return "🚌 **Transportation Agent:** Dynamic departure schedules are active. Express Metro dispatches start at 22:00. We recommend using Shuttle Line 4 for the fastest transit to NJ State highway routes.";

    case 'accessibility':
      if (query.includes('wheelchair') || query.includes('blind') || query.includes('help') || query.includes('disabled')) {
        return "♿ **Accessibility Service:** Wheelchair Assistance Team Delta has been dispatched to Gate 1 Main Entrance to meet Guest-309. Dynamic route generator has configured a step-free path via North Elevators to Sector C level. Sensory Calm Room is available in West Corridor Suite 104 with fully noise-dampening panels.";
      }
      return "♿ **Accessibility Guide:** We offer voice-navigated routes, high-contrast screen reader layouts, and assistive staff dispatches. Please request a volunteer helper at any kiosk or directly from this concierge.";

    case 'organizer_agent':
    default:
      return "📈 **Operational Summary:** Overall stadium safety is rated **Green (Stable)**. Capacity is 94.2%. Ticket scan operations are 99% complete. 5-minute Executive Briefing has been generated: 2 low-severity incidents (resolved), average entry queue is 8 minutes, food concessions grossing $182,000 this hour. All systems nominal.";
  }
}

// -----------------------------------------------------------------------------
// VITE OR STATIC FILE SERVING
// -----------------------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Run Vite dev middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    // Serve production static assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files serving loaded.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`StadiumMind AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
