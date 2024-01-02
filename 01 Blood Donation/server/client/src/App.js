import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import CCSpinner from "./Components/Pages/Spinner";
import { Helmet } from "react-helmet";

const App = () => {
  const Contact = lazy(() => import("./Components/Footer/Contact"));
  const AboutUS = lazy(() => import("./Components/Footer/AboutUS"));
  const PrivacyPolicy = lazy(() => import("./Components/Footer/PrivacyPolicy"));
  const TermsCondition = lazy(() =>
    import("./Components/Footer/Terms & Condition")
  );
  const Disclaimer = lazy(() => import("./Components/Footer/Disclaimer"));
  const Admin = lazy(() => import("./Components/Admin/Admin"));

  const jsonData = `
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        "name": "Life Blood",
        "url": "https://www.lifeblood.com",
        "description": "Upgrade Your Career in Coding. Learn coding skills and excel in the world of technology with Life Blood.",
        "logo": "https://www.lifeblood.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/lifeblood",
          "https://twitter.com/tamilcodingdevs",
          "https://www.linkedin.com/lifeblood",
          "https://www.instagram.com/tamil_coding_academy/",
          "https://github.com/lifeblood",
          "https://www.youtube.com/@lifeblood"
        ]
      }
    `;

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Life Blood</title>
        <link rel="canonical" href="https://www.lifeblood.com" />
        <link rel="icon" href="../public/favicon.ico" />
        <meta
          name="description"
          content="Life Blood - Upgrade Your Career in Coding. Learn coding skills and jump into the world of IT Felid with TCA."
        />

        {/* Open Graph Meta Tags for Social Media  */}
        <meta
          property="og:title"
          content="Life Blood - Upgrade Your Career in Coding"
        />
        <meta
          name="keywords"
          content="Life Blood, Tamil Coding, TCA, Bootcamp in Tamil, Tamil, Full stack Bootcamp, Frontend Bootcamp, Backend Bootcamp, MERN Stack, MERN, MEAN, MEAN Stack, Angular, ccschools, lifeblood, coding, learning, HTML, Python, CSS, SQL, JavaScript, How to, PHP, Java, C, C++, C#, jQuery, Bootstrap, Colors, XML, MySQL, Icons, NodeJS, React, Graphics, Angular, R, AI, Git, Data Science, Code Game, Tutorials, Programming, Web Development, Training, Learning, Quiz, Exercises, Courses, Lessons, References, Examples, Learn to code, Source code, Demos, Tips, Website, Redux, Express.js, Mongoose, Full-Stack, Bootcamp, RESTful API, Authentication, JWT, Material-UI, Heroku, AWS, ESLint, Prettier, npm, Yarn, Visual Studio Code, Postman, Environment Variables, Testing, CI/CD, Docker, WebSockets, Responsive Web Design, CORS, User Interface Design, Error Handling, File Uploads, Security Best Practices, SEO Optimization, Mobile-First Design, Cross-Browser Compatibility, Performance Tuning, Database Schema Design, API Documentation, Agile Development, Scrum Methodology, DevOps Practices, Frontend Frameworks, Backend Frameworks, RESTful Services, GraphQL Implementation, Single-Page Applications (SPAs), Progressive Web Apps (PWAs), Microservices Architecture, Serverless Computing, Web Security Practices, OAuth Authentication, Data Visualization, Machine Learning (ML), Natural Language Processing (NLP), Responsive UI/UX, Version Control Systems, Cloud Computing Platforms, Databases and Storage Solutions, Debugging Techniques, Performance Profiling, Web Accessibility Standards, Scalability and Load Balancing, Content Management Systems (CMS), E-commerce Solutions, Web Analytics, Online Marketing Strategies, User Experience (UX) Design, Usability Testing, Cybersecurity Measures, Internet of Things (IoT), Blockchain Technology, Virtual Reality (VR), Augmented Reality (AR), Data Privacy Compliance, Cloud-Native Applications, Responsive Images, Mobile App Development, Code Reviews, Code Refactoring, Continuous Monitoring, Performance Optimization Tools, API Gateways"
        />
        <meta
          property="og:description"
          content="Learn coding skills and excel in the world of technology with Life Blood."
        />
        <meta property="og:url" content="https://www.lifeblood.com" />
        <meta
          property="og:image"
          content="https://www.lifeblood.com/logo.png"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Life Blood - Upgrade Your Career in Coding"
        />
        <meta
          name="twitter:description"
          content="Learn coding skills and excel in the world of technology with Life Blood."
        />
        <meta
          name="twitter:image"
          content="https://www.lifeblood.com/logo.png"
        />

        {/* Schema.org JSON-LD Data  */}
        <script type="application/ld+json">{jsonData}</script>
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<CCSpinner />}>
              <Admin />
            </Suspense>
          }
        />
        {/* Footer */}
        <Route
          path="/contact"
          element={
            <Suspense fallback={<CCSpinner />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="/about-us"
          element={
            <Suspense fallback={<CCSpinner />}>
              <AboutUS />
            </Suspense>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Suspense fallback={<CCSpinner />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        <Route
          path="/terms&condition"
          element={
            <Suspense fallback={<CCSpinner />}>
              <TermsCondition />
            </Suspense>
          }
        />
        <Route
          path="/disclaimer"
          element={
            <Suspense fallback={<CCSpinner />}>
              <Disclaimer />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
