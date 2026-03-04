export interface Project {
    number: string;
    title: string;
    category: string;
    image: string;
    link: string;
    description: string;
    techStack: string[];
    features: string[];
}

export const projectData: Project[] = [
    {
        number: "01",
        title: "FinanceAI Assistant",
        category: "AI/ML",
        image: "src/assets/images/Rayibot.png",
        link: "https://rayibot.onrender.com",
        description:
            "An intelligent FinanceAI Assistant designed to provide financial insights and support. This chatbot leverages advanced Large Language Models (LLMs) to answer financial queries, analyze data, and offer personalized recommendations.",
        techStack: ["Python", "PostgreSQL", "Redis", "APIs"],
        features: [
            "Real-time financial query processing and analysis.",
            "Voice-enabled interaction capabilities.",
            "Optimized PostgreSQL schemas reducing query time.",
            "Redis caching integration for low-latency responses.",
        ],
    },
    {
        number: "02",
        title: "ASL Detection",
        category: "AI/ML",
        image: "src/assets/images/ASL.png",
        link: "https://github.com/ziko-ahmed/ASL",
        description:
            "A robust computer vision application that detects and translates American Sign Language (ASL) gestures in real-time. Designed to bridge the communication gap for the deaf and hard of hearing community.",
        techStack: ["Python", "TensorFlow", "OpenCV", "MediaPipe"],
        features: [
            "Real-time hand gesture tracking and recognition using MediaPipe.",
            "Custom-trained deep learning classification models built with TensorFlow.",
            "Live video feed processing with OpenCV.",
            "High accuracy detection across diverse lighting conditions.",
        ],
    },
    {
        number: "03",
        title: "Primetrade",
        category: "Web Development",
        image: "src/assets/images/primetrade.png",
        link: "https://primetrade-ua5d.onrender.com/",
        description:
            'A modern, responsive, full-stack task management application with real-time updates, strict role-based access control, and an intuitive Kanban dashboard.\n\nTest Credentials:\nAdmin: "admin@primetrade.com" (pw: "Admin")\nUser 1: "user1@primetrade.com" (pw: "User1")\nUser 2: "user2@primetrade.com" (pw: "User2")',
        techStack: ["React", "Node.js", "MongoDB", "WebSockets", "Tailwind CSS"],
        features: [
            "Interactive Kanban Board with drag-and-drop and strict status validations.",
            "Multi-user Task Assignment dynamically scaling transitions based on user consensus.",
            "Real-time Activity Feed streaming team updates live.",
            "Hidden Admin Control Panel for user management, account suspensions, and overall analytics.",
        ],
    },
    {
        number: "04",
        title: "DRAKZ",
        category: "Web Development",
        image: "src/assets/images/DRAKZ.png",
        link: "https://github.com/ziko-ahmed",
        description:
            'A comprehensive financial portfolio management platform designed to track investments, analyze market trends, and connect users with financial advisors.\n\nTest Credentials:\nAdmin: "admin@drakz.com" (pw: "123456")\nAdvisor: "advisor@drakz.com" (pw: "123456")\nUser: "rich@drakz.com" (pw: "123456")',
        techStack: ["MERN Stack", "Express", "React", "Node.js", "MongoDB"],
        features: [
            "Full-stack architecture with secure user authentication and authorization.",
            "Real-time dashboard for tracking asset performance and history.",
            "RESTful APIs for seamless frontend-backend communication.",
            "Advisor matching mechanism and appointment scheduling.",
        ],
    },
    {
        number: "05",
        title: "Movie Recommender",
        category: "AI/ML",
        image: "src/assets/images/Movie-Recommender.png",
        link: "https://ziko-ahmed-movie-recommender.streamlit.app",
        description:
            "A content-based movie recommendation engine that suggests similar movies based on comprehensive metadata including genres, cast, crew, and plot summaries.",
        techStack: ["Python", "Streamlit", "Pandas", "Scikit-learn"],
        features: [
            "Cosine similarity calculations for accurate recommendations.",
            "Integration with TMDB API for real-time movie posters.",
            "Clean, responsive web interface built with Streamlit.",
            "Fast data processing and retrieval pipelines.",
        ],
    },
    {
        number: "06",
        title: "Trend Scrapper",
        category: "Web Development",
        image: "src/assets/images/trend_scrapper.png",
        link: "https://github.com/ziko-ahmed/Trend-Scrapper",
        description:
            "A web scraping automated tool designed to extract trending topics and data from various social platforms and news outlets to identify current market trends.",
        techStack: ["Python", "BeautifulSoup", "Selenium", "Pandas"],
        features: [
            "Automated scheduled scraping scripts.",
            "Headless browser execution via Selenium.",
            "Data cleaning and structuring using Pandas DataFrames.",
            "Export capabilities for downstream data analysis.",
        ],
    },
    {
        number: "07",
        title: "Healthcare Chatbot",
        category: "AI/ML",
        image: "src/assets/images/HealthBot.png",
        link: "https://ziko-ahmed-healthbot.streamlit.app",
        description:
            "An interactive healthcare chatbot aimed at providing preliminary medical information and guiding users. It utilizes Natural Language Processing to understand patient symptoms and inquiries.",
        techStack: ["Python", "Streamlit", "NLP", "Scikit-learn"],
        features: [
            "Symptom analysis and initial condition prediction.",
            "Conversational interface accessible via web app.",
            "Deployed seamlessly using Streamlit Community Cloud.",
            "Built-in medical knowledge base for quick responses.",
        ],
    },
    {
        number: "08",
        title: "AI vs Human Text Classification",
        category: "AI/ML",
        image: "src/assets/images/AI_vs_Human.png",
        link: "https://github.com/ziko-ahmed/AI-v-s-Human-Text-Classification",
        description:
            "A predictive modeling tool developed to distinguish between human-written and AI-generated text. This project explores advanced NLP techniques to analyze linguistic patterns and anomalies.",
        techStack: ["Python", "TensorFlow", "Scikit-learn", "NLTK"],
        features: [
            "High accuracy text classification models.",
            "Extensive data preprocessing and feature engineering.",
            "Evaluation metrics comparing different ML algorithms.",
            "Capability to handle diverse writing styles and lengths.",
        ],
    },
    {
        number: "09",
        title: "EI & DS Lab Website",
        category: "Web Development",
        image: "src/assets/images/EIDS.png",
        link: "https://eids-lab.vercel.app",
        description:
            "The official website for the Embedded Intelligence and Data Systems (EI & DS) Lab at IIIT Sri City. Built to showcase research, publications, and lab members dynamically.",
        techStack: ["React", "Next.js", "Tailwind CSS", "Vercel"],
        features: [
            "Modern, responsive UI with fast load times.",
            "Dynamic routing for individual research projects and member profiles.",
            "Optimized image delivery and component architecture.",
            "Seamless deployment pipeline through Vercel.",
        ],
    },
    {
        number: "10",
        title: "Restaurant App",
        category: "Web Development",
        image: "src/assets/images/restaurant_app.png",
        link: "https://github.com/ziko-ahmed/Restaurant-App",
        description:
            "A fully functional restaurant management and online ordering application featuring a dynamic menu, cart system, and order tracking.",
        techStack: ["HTML", "CSS", "JavaScript", "React"],
        features: [
            "Interactive UI for browsing menus and selecting items.",
            "State management for handling the shopping cart and checkout flow.",
            "Responsive design adapted for mobile and desktop screens.",
            "Simulated backend API integration for order processing.",
        ],
    },
];
