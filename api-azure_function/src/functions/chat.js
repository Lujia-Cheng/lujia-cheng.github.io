const { app } = require("@azure/functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { BlobServiceClient } = require("@azure/storage-blob");

async function uploadTextToBlob(
  connectionString,
  containerName,
  blobName,
  text
) {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadBlobResponse = await blockBlobClient.upload(text, text.length);
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
}

app.http("chat", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const body = await request.json();
    context.log(body);
    if (!body || !body.message) {
      return {
        status: 400,
        body: {
          message:
            "No message provided. Body should be {message: String, history?:[]}",
        },
      };
    }
    const { message = "", history = [] } = body;

    const genAI = new GoogleGenerativeAI(process.env["GEMINI_API_KEY"]);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You're a assistant on Luke's personal website. You'll be talking to a visitor in your future prompt. Because it's a personal website, you don't need to be too professional. And I have attached his resume below for you convenience.  \n\n 
              SUMMARY 	
              Luke’s foundation in chemistry instilled rigorous problem-solving skills, while philosophy honed the ability to examine underlying paradigms. Inspired by technology's transformative potential and fueled by a passion for coding, he pursued a master’s in information science to apply these skills to software development. His project portfolio demonstrates his adaptability and progress in this transition.
              
              EDUCATIONS	
              M.S. in Information Science | University of Pittsburgh | GPA 3.8	08/2022 – 05/2024
              •	Relevant Courses: algorithms, data structures, database, interactive system design, machine learning, network, cryptography
              B.S. in Chemistry and Philosophy | Virginia Tech	08/2016 – 12/2020
              •	Relevant Courses: Software Design, Java, Ethics & AI
              
              PROJECTS	
              CUDA Learning & Experimentation | CUDA, C++
              •	Explore CUDA C++ for parallel programming, developed through ongoing project work (including matrix operations, image filtering, and more in development)
              Full-stack E-Commerce Website | MongoDB, Express, React, Node.js | demo, source code (glitch.com)
              •	Built a MERN stack e-commerce platform featuring product search, shopping cart, and user profile management.
              •	Overcame challenges in deployment to Glitch.com, displayed adaptability under unfamiliar paradigms.
              Android Morse Code Keyboard | android, Java, Kotlin | demo, source code (github.com)
              •	Built an Android Input Method Editor (IME) to make the Morse code learning process more intuitive.
              •	Utilized haptic feedback during typing to reinforce Morse code learning through pattern recognition. 
              Creative Python Project: Image to Staggered Brick Walls | Python, scikit | demo, source code (github.com)
              •	A creative project that utilized Python packages (NumPy, scikit-image, scikit-learn) to generate color palettes from images and visually construct brick walls using the extracted colors.
              Patient Like Mine | web dev
              •	Developed a patient record internal search platform enabling physicians to evaluate treatment efficacy.
              •	Conducted comprehensive UI/UX research among UPMC medical professionals.
              •	Designed the UI based on research findings, incorporating data retrieval in compliance with Fast Healthcare Interoperability Resources (FHIR) standards.
              •	Orchestrated the integration with a UPMC-provided database.
              Bon Voyage | C#, Unity | demo, source code (github.com)
              •	Received the First Penguin award at the 2023 Game4SocialImpact game jam at University of Pittsburgh.
              •	Self-taught C# base on documentation and previous experience in Java.
              •	Developed a third-person game using Unity within two days. Demonstrated adaptability and rapid skill acquisition.
              Twofish Encryption in Java & Misc. Cryptography | Java | source code (github.com)
              •	Implemented the Twofish encryption algorithm in Java.
              •	Developed a collection of cryptography-related scripts to support encryption and decryption processes.
              PPG Paint Data Mining | R, RStudio
              •	Conducted a detailed analysis of a PPG-sponsored paint sales dataset.
              •	Applied advanced data mining techniques to uncover key features.
              •	Identified correlations with paint popularity, significantly improving predictive accuracy.
              •	Generated actionable insights into consumer preferences for strategic decision-making.
              Screeps AI | JavaScript, typescript
              •	Developed control scripts in JavaScript for the Screeps.com game.
              •	Implemented data storage optimizations and efficient garbage collection techniques.
              Screeps Doc/API Translation | source code (github.com)
              •	Led a community project to translate Screeps documents/API into Chinese (zh-CN).
              •	Engaged bilingual users for ongoing project maintenance.
              •	Utilized GitHub for collaborative translating, documentation, and source control. 
              
              LEADERSHIP & ACTIVITIES 	
              •	Led the CyberPanther1, the University of Pittsburgh's CyberForce competition team, to a 46th-place finish out of 108 teams. We repaired a vandalized React frontend, migrated the backend and database to a secured virtual machine, reconfigured DNS, and actively monitored and defended all machines throughout the 8-hour competition. Additionally, I provided training and assistance to our sibling team, CyberPanther2.
              •	Achieved the First Penguin Award at the Games4SocialImpact 2023 | University of Pittsburgh for innovative design.
              •	Establisher and maintainer of Screeps China (github.com), a documents/API translation project to create accessibility of non-English speaking developers.
              •	Served as Treasurer for the Virginia Tech Parkour Club, managing financial operations, securing local gymnastics discounts for the club, and stabilizing leadership transitions during the challenges posed by COVID-19.
              
              SKILLS	
               
              Programming Language
              JavaScript, TypeScript, HTML, CSS, Java, Python, C#, C++, R, MATLAB
              Framework
              ReactJS, Bootstrap, jQuery, Node.js, Express.js, Django, Flask
              DevOps
              Git, GitHub Action, CI/CD
              Cloud
              AWS (Amazon Web Services), Azure (Microsoft Azure), Docker (Containerization)
              Database
              MySQL, MariaDB, MongoDB, SQLite
              Other
              Android, Unity, Linux, MS Office Suit 
               
              OTHER EXPERIENCE	
              Research Scientist | ChemPacific Corp, Baltimore, MD	05/2021 – 05/2022
              •	Automated High-Performance Liquid Chromatography (HPLC) testing process, reducing machine idle time.
              •	Optimized Good Manufacturing Practice (GMP) production procedures, achieving a more efficient workflow that reduced a 30-minute daily workload. 
              •	Assisted QA in navigating international chemical import/export regulations, collaborating with a foreign regulatory body to ensure product compliance.
              •	Translated complex synthesis processes into clear, concise, and implementable production guidelines for overseas partner plants, ensuring consistent quality from small-patch development environment to overseas mass-production facilities.`,
            },
          ],
        },
        ...history.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text || "" }],
        })),
      ],
    });

    // console.log(msg);
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    // todo save msg and response to db
    try {
      uploadTextToBlob(
        process.env["AzureWebJobsStorage"],
        "chat-history",
        Date.now(),
        `${message}\n${text}`
      );
    } catch (e) {
      console.log(e);
    }
    // console.log(text);
    return { body: JSON.stringify({ message: text }) };
  },
});
