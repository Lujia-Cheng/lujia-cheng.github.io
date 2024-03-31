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
  await containerClient.createIfNotExists();

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadBlobResponse = await blockBlobClient.upload(text, text.length);
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
}

async function chat(request, context) {
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
  const { message, history = [] } = body;
  // todo move this into a proper format
  const resume = `# Luke Cheng 
  ## SUMMARY 
  Luke's background in chemistry and philosophy instilled a rigorous problem-solving mindset and the ability to analyze complex systems. Intrigued by technology's potential to create real-world solutions, he pivoted his career, earning a master's in information science - a field encompassing algorithm design, data analysis, security, and human factors. His project portfolio demonstrates adaptability, a drive to continuously learn, and a commitment to developing impactful technology. This includes collaborating with the bioinformatics department to develop a patient record search platform (Patient Like Mine) used by UPMC physicians to improve data-driven treatment decisions, building a personal website with a custom AI chatbot to explore the frontiers of AI technology, and spearheading a community effort to translate the Screeps documents and APIs into Chinese, fostering accessibility for hundreds of developers. 
  ## EDUCATIONS 
  ### M.S. in Information Science | University of Pittsburgh | GPA 3.8 08/2022 - 05/2024 
  - Relevant Courses: algorithms, data structures, database, interactive system design, machine learning, network, cryptography 
  ### B.S. in Chemistry and Philosophy | Virginia Tech 08/2016 - 12/2020 
  - Relevant Courses: software design, java, ethics & AI 
  ## EXPERIENCE 
  ### Chemist | ChemPacific Corp, Baltimore, MD 05/2021 - 05/2022 
  - Optimized Good Manufacturing Practice (GMP) production procedures and automated High-Performance Liquid Chromatography (HPLC) testing using Agilent script, reducing daily workload by 30 minutes, streamlining processes, and minimizing machine idle time.
  - Collaborated with QA and the National Medical Products Administration (NMPA) to ensure international chemical import/export compliance, demonstrating adaptability, meticulous attention to detail, and effective cross-cultural communication and negotiation skills.
  - Translated complex synthesis processes into clear production guidelines for an overseas mass-production subsidiary, ensuring consistent quality across development and international production environments and facilitating effective cross-border collaboration.
  - Developed a low-budget remote controlling solution using a smart plug and webcam, enabling weekend reaction supervision and improving resource utilization. 
  ## PROJECTS 
  ### Personal Website with AI Chat Assistant | React, Azure, OpenAI, Google Gemini | [lujia-cheng.github.io](http://lujia-cheng.github.io/) 
  - Developed a personal website featuring an AI chat assistant trained on my resume, project details, and insights into my motivations and career goals. This enables the assistant to provide in-depth answers about my professional experience, skills, and aspirations.
  - Leveraged React for front-end development, Azure for serverless architecture, and fine-tuned a large language model (Gemini/Gemma) for this specialized conversational experience. 
  ### Patient Like Mine | UI/UX, web dev, search engine 
  - Developed an internal patient record search platform for UPMC physicians, empowering them to rapidly evaluate treatment efficacy and make informed decisions.
  - Led comprehensive UX research among medical professionals.
  - Designed a highly intuitive UI based on research findings, ensuring seamless data retrieval while strictly adhering to Fast Healthcare Interoperability Resources (FHIR) standards.
  - Orchestrated successful integration with a UPMC database, enabling secure and efficient data exchange. 
  ### Screeps Doc/API Translation | Git, GitHub Action | [Organization Repo](https://github.com/screeps-cn) 
  - Spearheaded a developer community effort to translate Screeps documents and API into Chinese (zh-CN), significantly increasing accessibility for hundreds of developers.
  - Streamlined the CI/CD process by leveraging GitHub for collaborative work, documentation management, and effective source control. 
  ### Full-stack E-Commerce Website | MongoDB, Express, React, Node.js | [Interactive Demo](https://glitch.com/@a-plus-team/infsci-2560-final-project) 
  - Developed a full-featured MERN stack e-commerce platform, including product search, shopping cart functionality, and user profile management.
  - Demonstrated adaptability and problem-solving by successfully overcoming deployment challenges within the unique constraints of Glitch.com's CI/CD workflow. 
  ### Android Morse Code Keyboard | android, Java, Kotlin | [Illustrated Demo](https://github.com/Lujia-Cheng/MorseCodeIME) 
  - Developed a unique Android Input Method Editor (IME) designed to facilitate intuitive Morse code learning.
  - Integrated haptic feedback to reinforce Morse code patterns, creating a multi-sensory learning experience. 
  ### Creative Python Project: Image to Staggered Brick Walls | Python | [Illustrated Demo](https://github.com/Lujia-Cheng/ke-architecture-sandbox) 
  - A creative project that utilized Python packages (NumPy, scikit-image, scikit-learn) to generate color palettes from images and visually construct brick walls using the extracted colors. 
  ### Bon Voyage | C#, Unity | [Interactive Demo](https://github.com/emmhh/negImapct) 
  - Received the First Penguin Award at the 2023 Games4SocialImpact game jam (University of Pittsburgh) for developing a third-person adventure game that creatively explores themes of “age”.
  - Leveraged C## and Unity expertise to rapidly develop the award-winning game within a two-day timeframe, demonstrating technical proficiency and adaptability. 
  ### Twofish Encryption in Java & Misc. Cryptography | Java | [Project Overview](https://github.com/Lujia-Cheng/CryptoPlayground) 
  - Implemented the Twofish encryption algorithm in Java, demonstrating a strong understanding of cryptographic principles.
  - Developed a suite of cryptography-related scripts, streamlining encryption and decryption tasks and showcasing versatility. 
  ### CUDA Learning & Experimentation | CUDA, C++ 
  - Actively learning and experimenting with CUDA C++ for parallel programming, applying it to projects such as matrix operations and image filtering. 
  ### PPG Paint Data Mining | R, RStudio 
  - Analyzed a PPG-sponsored paint sales dataset, uncovering key features influencing popularity and improving predictive accuracy for demand forecasting.
  - Applied advanced data mining techniques (consider listing a few specifics) to extract actionable insights into consumer preferences, informing strategic decision-making. 
  ### Screeps AI | JavaScript, typescript 
  - Developed control scripts in JavaScript for the Screeps.com game.
  - Implemented data storage optimizations and efficient garbage collection techniques. 
  ## LEADERSHIP & ACTIVITIES 
  - Led the University of Pittsburgh's delegation (CyberPanther1) to the CyberForce competition, spearheading a rapid response to sabotage during the 8-hour competition. Rebuilt the React frontend, migrated systems to a secure virtual machine, and actively defended the infrastructure. Additionally, mentored our sibling team, contributing to an improved overall college ranking.
  - Recognized with the First Penguin Award at Games4SocialImpact 2023 (University of Pittsburgh) game jam for developing "Bon Voyage", an innovative third-person exploration game focused on the theme of "age".
  - Founded and maintaining Screeps China (github.com), a doc/API translation project that expanded access to hundreds of Chinese-speaking developers by translating essential documentation and APIs.
  - Stabilized the Virginia Tech Parkour Club as Treasurer, managing finances, securing a 60% discount for members, and navigating leadership transitions during the challenges of COVID-19.`;
  const genAI = new GoogleGenerativeAI(process.env["GEMINI_API_KEY"]);
  const model = genAI.getGenerativeModel(
    { model: "gemini-pro" },
    { apiVersion: "v1beta" }
  );

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text:
              `You're a assistant on Luke's website. You'll be talking to a visitor in all future prompts. Try to keep the response concise and tech-field professional. Luke is a new grad with interesting skill sets and I'll let you figure that out from his resume attached below. When answering question, try to summarize his resume and deduct from it rather than quoting straight from the resume.\n\nResume:\n` +
              resume,
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
  context.log(message, "|", JSON.stringify(result));
  if (result.error) {
    return {
      status: 500,
      body: { message: result.error },
    };
  }
  const response = await result.response;
  const text = response.text();

  // todo save msg and response to db

  // await uploadTextToBlob(
  //   process.env["AzureWebJobsStorage"],
  //   "chat-history",
  //   Date.now(),
  //   `${message} ${text}`
  // );

  // console.log(text);
  return {
    status: 200,
    body: JSON.stringify({ message: text }),
  };
}

app.http("chat", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: chat,
});
