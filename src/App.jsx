import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [page, setPage] = useState("home");
  const [selectedJob, setSelectedJob] = useState(null);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setPage("home");
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setPage("job-details");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <button
            onClick={() => setPage("home")}
            className="text-2xl font-bold text-blue-600"
          >
            JobMatch AI
          </button>

          <div className="flex items-center gap-5">

            <button
              onClick={() => setPage("home")}
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </button>

            <button
              onClick={() => setPage("jobs")}
              className="text-gray-700 hover:text-blue-600"
            >
              Find Jobs
            </button>

            <button
              onClick={() => setPage("about")}
              className="text-gray-700 hover:text-blue-600"
            >
              About
            </button>

            {user && user.role === "jobseeker" && (
              <>
                <button
                  onClick={() => setPage("dashboard")}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => setPage("ai-resume")}
                  className="text-gray-700 hover:text-blue-600"
                >
                  AI Resume
                </button>
              </>
            )}

            {user && user.role === "recruiter" && (
              <>
                <button
                  onClick={() => setPage("recruiter-dashboard")}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Recruiter
                </button>

                <button
                  onClick={() => setPage("post-job")}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Post Job
                </button>

                <button
                  onClick={() => setPage("my-jobs")}
                  className="text-gray-700 hover:text-blue-600"
                >
                  My Jobs
                </button>
              </>
            )}

            {!user ? (
              <>
                <button
                  onClick={() => setPage("login")}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </button>

                <button
                  onClick={() => setPage("register")}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}

      {page === "home" && (
        <HomePage
          setPage={setPage}
          onViewJob={handleViewJob}
        />
      )}

      {page === "jobs" && (
        <JobsPage
          onViewJob={handleViewJob}
        />
      )}

      {page === "job-details" && selectedJob && (
        <JobDetailsPage
          job={selectedJob}
          setPage={setPage}
        />
      )}

      {page === "login" && (
        <LoginPage
          setPage={setPage}
          setUser={setUser}
        />
      )}

      {page === "register" && (
        <RegisterPage
          setPage={setPage}
        />
      )}

      {page === "about" && (
        <AboutPage />
      )}

      {page === "dashboard" && user && (
        <JobSeekerDashboard />
      )}

      {page === "admin-dashboard" && user && user.role === "admin" && (
  <AdminDashboard />
)}

      {page === "recruiter-dashboard" && user && (
        <RecruiterDashboard />
      )}

      {page === "post-job" && user && (
        <PostJobPage
          setPage={setPage}
        />
      )}

      {page === "my-jobs" && user && (
        <MyJobsPage />
      )}

      {page === "ai-resume" && user && (
        <AIResumeAnalyzer />
      )}

    </div>
  );
}


/* =========================================================
   HOME PAGE
========================================================= */

function HomePage({ setPage, onViewJob }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/jobs"
        );

        setJobs(response.data.jobs || response.data);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>

      {/* HERO */}

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-6">
            Find Your Dream Job With AI
          </h1>

          <p className="text-xl mb-8 max-w-2xl mx-auto">
            AI-powered resume analysis and intelligent job matching
            to help you find the right career opportunities.
          </p>

          <button
            onClick={() => setPage("jobs")}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Explore Jobs
          </button>

        </div>

      </section>


      {/* AI FEATURES */}

      <section className="py-16">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful AI Features
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <FeatureCard
              title="AI Resume Analysis"
              description="Analyze your resume and get intelligent improvement suggestions."
            />

            <FeatureCard
              title="Job Match Score"
              description="Compare your resume with jobs and get an AI-powered match score."
            />

            <FeatureCard
              title="Job Recommendations"
              description="Discover jobs that match your skills and career interests."
            />

            <FeatureCard
              title="AI Career Assistant"
              description="Get useful career guidance and job-search assistance."
            />

          </div>

        </div>

      </section>


      {/* FEATURED JOBS */}

      <section className="py-16 bg-gray-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              Featured Jobs
            </h2>

            <button
              onClick={() => setPage("jobs")}
              className="text-blue-600 font-semibold"
            >
              View All Jobs →
            </button>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {jobs.slice(0, 3).map((job) => (

              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
              >

                <h3 className="text-xl font-bold mb-2">
                  {job.title}
                </h3>

                <p className="text-gray-600 mb-2">
                  {job.company}
                </p>

                <p className="text-gray-500 mb-4">
                  {job.location}
                </p>

                <button
                  onClick={() => onViewJob(job)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Job
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="py-20 bg-blue-600 text-white text-center">

        <h2 className="text-3xl font-bold mb-4">
          Ready to Find Your Dream Job?
        </h2>

        <p className="mb-8">
          Upload your resume and let AI help you find suitable opportunities.
        </p>

        <button
          onClick={() => setPage("jobs")}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold"
        >
          Start Your Job Search
        </button>

      </section>

    </div>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">

      <div className="text-blue-600 text-3xl mb-4">
        ✨
      </div>

      <h3 className="text-xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   JOBS PAGE
========================================================= */

function JobsPage({ onViewJob }) {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const response = await axios.get(
          "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/jobs"
        );

        setJobs(response.data.jobs || response.data);

      } catch (err) {

        console.error(err);

        setError("Failed to load jobs.");

      } finally {

        setLoading(false);

      }

    };

    fetchJobs();

  }, []);


  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading jobs...
      </div>
    );
  }


  return (

    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        Find Jobs
      </h1>

      {error && (
        <p className="text-red-500 mb-6">
          {error}
        </p>
      )}


      {jobs.length === 0 ? (

        <p className="text-gray-600">
          No jobs available.
        </p>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
            >

              <h2 className="text-xl font-bold mb-2">
                {job.title}
              </h2>

              <p className="text-gray-600">
                {job.company}
              </p>

              <p className="text-gray-500 mt-2">
                📍 {job.location}
              </p>

              <p className="text-gray-500">
                💼 {job.jobType}
              </p>

              <p className="text-gray-500">
                💰 {job.salary || "Not specified"}
              </p>

              <div className="mt-4">

                <p className="font-semibold">
                  Required Skills
                </p>

                <div className="flex flex-wrap gap-2 mt-2">

                  {job.requiredSkills?.map((skill, index) => (

                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

              <button
                onClick={() => onViewJob(job)}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                View Job
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}


/* =========================================================
   JOB DETAILS PAGE
========================================================= */

function JobDetailsPage({ job, setPage }) {

  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [matchResult, setMatchResult] = useState("");
  const [matchLoading, setMatchLoading] = useState(false);


  /* =====================================================
     APPLY FOR JOB
  ===================================================== */

  const applyForJob = async () => {

    setMessage("");
    setError("");

    try {

      const token = localStorage.getItem("token");

      if (!token) {

        setError("Please login as a Job Seeker first.");

        return;

      }


      const response = await axios.post(
        "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/applications",
        {
          jobId: job._id,
          coverLetter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setMessage(
        response.data.message || "Application submitted successfully."
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to submit application."
      );

    }

  };


  /* =====================================================
     AI JOB MATCH
     IMPORTANT: THIS FUNCTION MUST BE INSIDE COMPONENT
  ===================================================== */

  const checkJobMatch = async () => {

    setError("");
    setMatchResult("");


    if (!resume) {

      setError("Please select your PDF resume first.");

      return;

    }


    if (resume.type !== "application/pdf") {

      setError("Only PDF resumes are allowed.");

      return;

    }


    try {

      const token = localStorage.getItem("token");


      if (!token) {

        setError("Please login as a Job Seeker first.");

        return;

      }


      setMatchLoading(true);


      const formData = new FormData();

      formData.append("resume", resume);

      formData.append(
        "jobTitle",
        job.title
      );

      formData.append(
        "company",
        job.company
      );

      formData.append(
        "description",
        job.description
      );

      formData.append(
        "requiredSkills",
        job.requiredSkills?.join(", ")
      );

      formData.append(
        "experience",
        job.experience
      );


      const response = await axios.post(
        "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/ai/match-job",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setMatchResult(
        response.data.matchResult
      );


    } catch (err) {

      console.error("AI Job Match Error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to calculate AI job match."
      );

    } finally {

      setMatchLoading(false);

    }

  };


  return (

    <div className="max-w-5xl mx-auto px-6 py-12">


      {/* BACK */}

      <button
        onClick={() => setPage("jobs")}
        className="text-blue-600 mb-6"
      >
        ← Back to Jobs
      </button>


      {/* JOB DETAILS */}

      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-4xl font-bold mb-3">
          {job.title}
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          {job.company}
        </p>


        <div className="grid md:grid-cols-2 gap-4 mb-8">

          <p>
            <strong>Location:</strong> {job.location}
          </p>

          <p>
            <strong>Job Type:</strong> {job.jobType}
          </p>

          <p>
            <strong>Experience:</strong> {job.experience}
          </p>

          <p>
            <strong>Salary:</strong>{" "}
            {job.salary || "Not specified"}
          </p>

        </div>


        <h2 className="text-2xl font-bold mb-3">
          Job Description
        </h2>

        <p className="text-gray-700 whitespace-pre-line mb-8">
          {job.description}
        </p>


        <h2 className="text-2xl font-bold mb-3">
          Required Skills
        </h2>

        <div className="flex flex-wrap gap-2 mb-10">

          {job.requiredSkills?.map((skill, index) => (

            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
            >
              {skill}
            </span>

          ))}

        </div>


        {/* =================================================
            AI JOB MATCH
        ================================================= */}

        <div className="border-2 border-purple-200 rounded-xl p-6 mb-10 bg-purple-50">

          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            🤖 AI Job Match
          </h2>

          <p className="text-gray-600 mb-5">
            Upload your resume and let AI compare your skills
            with this job.
          </p>


          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {

              setResume(e.target.files[0]);

              setMatchResult("");

              setError("");

            }}
            className="w-full border p-3 rounded-lg bg-white"
          />


          {resume && (

            <p className="text-gray-600 mt-2">

              Selected:{" "}

              <strong>
                {resume.name}
              </strong>

            </p>

          )}


          <button
            type="button"
            onClick={checkJobMatch}
            disabled={matchLoading || !resume}
            className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >

            {matchLoading
              ? "Analyzing Match..."
              : "Check AI Job Match"}

          </button>


          {matchResult && (

            <div className="mt-6 bg-white border rounded-lg p-6">

              <h3 className="text-xl font-bold text-purple-700 mb-4">
                AI Match Result
              </h3>

              <div className="whitespace-pre-line text-gray-700">
                {matchResult}
              </div>

            </div>

          )}

        </div>


        {/* =================================================
            APPLY
        ================================================= */}

        <div className="border-t pt-8">

          <h2 className="text-2xl font-bold mb-5">
            Apply for this Job
          </h2>


          {message && (

            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
              {message}
            </div>

          )}


          {error && (

            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
              {error}
            </div>

          )}


          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Write your cover letter..."
            className="w-full border p-4 rounded-lg min-h-40 mb-4"
          />


          <button
            onClick={applyForJob}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Apply Now
          </button>

        </div>

      </div>

    </div>

  );

}


/* =========================================================
   LOGIN PAGE
========================================================= */

function LoginPage({ setPage, setUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await axios.post(
        "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );


      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      setUser(response.data.user);

      if (response.data.user.role === "admin") {

  setPage("admin-dashboard");

} else if (response.data.user.role === "recruiter") {

  setPage("recruiter-dashboard");

} else {

  setPage("dashboard");

}


    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Login failed."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="max-w-md mx-auto px-6 py-16">

      <div className="bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>


        {error && (

          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>

        )}


        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
            required
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg mb-6"
            required
          />


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        <p className="text-center mt-6">

          Don't have an account?{" "}

          <button
            onClick={() => setPage("register")}
            className="text-blue-600"
          >
            Sign Up
          </button>

        </p>

      </div>

    </div>

  );

}


/* =========================================================
   REGISTER PAGE
========================================================= */

function RegisterPage({ setPage }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleRegister = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");


    try {

      const response = await axios.post(
        "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );


      setMessage(
        response.data.message ||
        "Registration successful."
      );


      setTimeout(() => {
        setPage("login");
      }, 1000);


    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registration failed."
      );

    }

  };


  return (

    <div className="max-w-md mx-auto px-6 py-16">

      <div className="bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h1>


        {message && (

          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            {message}
          </div>

        )}


        {error && (

          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>

        )}


        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
            required
          />


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
            required
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
            required
          />


          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-3 rounded-lg mb-6"
          >

            <option value="jobseeker">
              Job Seeker
            </option>

            <option value="recruiter">
              Recruiter
            </option>

          </select>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>

        </form>

      </div>

    </div>

  );

}


/* =========================================================
   ABOUT PAGE
========================================================= */

function AboutPage() {

  return (

    <div className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-6">
        About JobMatch AI
      </h1>

      <p className="text-lg text-gray-700 leading-8">
        JobMatch AI is an AI-powered resume and job matching
        platform designed to connect job seekers with recruiters.
        The platform allows users to create profiles, search for
        jobs, apply for opportunities and analyze their resumes
        using artificial intelligence.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <FeatureCard
          title="For Job Seekers"
          description="Find suitable jobs, upload resumes and receive AI-powered job matching."
        />

        <FeatureCard
          title="For Recruiters"
          description="Post jobs, manage applications and evaluate candidates."
        />

        <FeatureCard
          title="AI Powered"
          description="AI analyzes resumes and compares candidate skills with job requirements."
        />

      </div>

    </div>

  );

}


/* =========================================================
   JOB SEEKER DASHBOARD
========================================================= */

function JobSeekerDashboard() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/applications/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(
          response.data.applications ||
          response.data
        );

      } catch (err) {

        console.error(err);

        setError(
          err.response?.data?.message ||
          "Failed to load applications."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchApplications();

  }, []);


  return (

    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        Job Seeker Dashboard
      </h1>


      {loading && (
        <p>Loading applications...</p>
      )}


      {error && (
        <p className="text-red-500">{error}</p>
      )}


      {!loading && applications.length === 0 && (

        <p className="text-gray-600">
          You have not applied for any jobs yet.
        </p>

      )}


      <div className="grid md:grid-cols-2 gap-6">

        {applications.map((application) => (

          <div
            key={application._id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-xl font-bold">
              {application.jobId?.title}
            </h2>

            <p className="text-gray-600">
              {application.jobId?.company}
            </p>

            <p className="mt-4">
              Status:
            </p>

            <span className="inline-block mt-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {application.status}
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}


/* =========================================================
   RECRUITER DASHBOARD
========================================================= */

function RecruiterDashboard() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchApplications = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/applications/recruiter",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setApplications(
        response.data.applications ||
        response.data
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to load applications."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchApplications();

  }, []);


  const updateStatus = async (applicationId, status) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `https://ai-resume-job-matching-platform-backend-1.onrender.com/api/applications/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      fetchApplications();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Failed to update status."
      );

    }

  };


  return (

    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        Recruiter Dashboard
      </h1>


      {loading && (
        <p>Loading applications...</p>
      )}


      {error && (
        <p className="text-red-500">{error}</p>
      )}


      <div className="grid md:grid-cols-2 gap-6">

        {applications.map((application) => (

          <div
            key={application._id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-xl font-bold mb-2">
              {application.applicantId?.name}
            </h2>

            <p className="text-gray-600 mb-2">
              {application.applicantId?.email}
            </p>

            <p className="font-semibold">
              Job: {application.jobId?.title}
            </p>

            <p className="text-gray-600">
              Current Status: {application.status}
            </p>


            <div className="flex gap-3 mt-5">

              <button
                onClick={() =>
                  updateStatus(
                    application._id,
                    "Shortlisted"
                  )
                }
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Shortlist
              </button>


              <button
                onClick={() =>
                  updateStatus(
                    application._id,
                    "Rejected"
                  )
                }
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Reject
              </button>


              <button
                onClick={() =>
                  updateStatus(
                    application._id,
                    "Selected"
                  )
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Select
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}


/* =========================================================
   POST JOB PAGE
========================================================= */

function PostJobPage({ setPage }) {

  const [form, setForm] = useState({

    title: "",
    company: "",
    description: "",
    requiredSkills: "",
    experience: "",
    location: "",
    salary: "",
    jobType: "Full-time",

  });


  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");


    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/jobs",
        {
          ...form,
          requiredSkills: form.requiredSkills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setMessage(
        response.data.message ||
        "Job posted successfully."
      );


      setForm({

        title: "",
        company: "",
        description: "",
        requiredSkills: "",
        experience: "",
        location: "",
        salary: "",
        jobType: "Full-time",

      });


    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to post job."
      );

    }

  };


  return (

    <div className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        Post a Job
      </h1>


      {message && (

        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
          {message}
        </div>

      )}


      {error && (

        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>

      )}


      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow space-y-4"
      >

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-3 rounded-lg"
          required
        />


        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border p-3 rounded-lg"
          required
        />


        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full border p-3 rounded-lg min-h-32"
          required
        />


        <input
          name="requiredSkills"
          value={form.requiredSkills}
          onChange={handleChange}
          placeholder="Required Skills (React, JavaScript, MongoDB)"
          className="w-full border p-3 rounded-lg"
          required
        />


        <input
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="w-full border p-3 rounded-lg"
          required
        />


        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-3 rounded-lg"
          required
        />


        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border p-3 rounded-lg"
        />


        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >

          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>

        </select>


        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Post Job
        </button>

      </form>

    </div>

  );

}


/* =========================================================
   MY JOBS PAGE
========================================================= */

function MyJobsPage() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingJob, setEditingJob] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // ==========================================
  // Fetch My Jobs
  // ==========================================

  const fetchJobs = async () => {

    try {

      const response = await axios.get(
        "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/jobs"
      );

      const allJobs =
        response.data.jobs ||
        response.data;

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const myJobs = allJobs.filter(
        (job) =>
          job.recruiterId?._id === user?.id ||
          job.recruiterId === user?.id
      );

      setJobs(myJobs);

    } catch (error) {

      console.error(error);

      setError("Failed to load jobs.");

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchJobs();

  }, []);


  // ==========================================
  // Delete Job
  // ==========================================

  const deleteJob = async (jobId) => {

    if (!window.confirm("Delete this job?")) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://ai-resume-job-matching-platform-backend-1.onrender.com/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Job deleted successfully.");
      setError("");

      fetchJobs();

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Failed to delete job."
      );

    }

  };


  // ==========================================
  // Start Editing
  // ==========================================

  const startEdit = (job) => {

    setEditingJob({
      ...job,
      requiredSkills:
        job.requiredSkills?.join(", ") || "",
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // ==========================================
  // Handle Edit Input
  // ==========================================

  const handleEditChange = (e) => {

    setEditingJob({
      ...editingJob,
      [e.target.name]: e.target.value,
    });

  };


  // ==========================================
  // Update Job
  // ==========================================

  const updateJob = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const token = localStorage.getItem("token");

      const updatedData = {

        title: editingJob.title,

        company: editingJob.company,

        description: editingJob.description,

        requiredSkills:
          editingJob.requiredSkills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),

        experience: editingJob.experience,

        location: editingJob.location,

        salary: editingJob.salary,

        jobType: editingJob.jobType,

      };


      await axios.put(
        `https://ai-resume-job-matching-platform-backend-1.onrender.com/api/jobs/${editingJob._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setMessage("Job updated successfully.");

      setError("");

      setEditingJob(null);

      fetchJobs();


    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to update job."
      );

    }

  };


  // ==========================================
  // Loading
  // ==========================================

  if (loading) {

    return (

      <div className="text-center py-20">

        <p className="text-xl">
          Loading...
        </p>

      </div>

    );

  }


  return (

    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        My Jobs
      </h1>


      {/* ======================================
          SUCCESS MESSAGE
      ====================================== */}

      {message && (

        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
          {message}
        </div>

      )}


      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {error && (

        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>

      )}


      {/* ======================================
          EDIT FORM
      ====================================== */}

      {editingJob && (

        <div className="bg-white rounded-xl shadow p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            ✏️ Edit Job
          </h2>


          <form
            onSubmit={updateJob}
            className="space-y-4"
          >

            {/* Job Title */}

            <input
              type="text"
              name="title"
              value={editingJob.title}
              onChange={handleEditChange}
              placeholder="Job Title"
              className="w-full border p-3 rounded-lg"
              required
            />


            {/* Company */}

            <input
              type="text"
              name="company"
              value={editingJob.company}
              onChange={handleEditChange}
              placeholder="Company"
              className="w-full border p-3 rounded-lg"
              required
            />


            {/* Description */}

            <textarea
              name="description"
              value={editingJob.description}
              onChange={handleEditChange}
              placeholder="Job Description"
              className="w-full border p-3 rounded-lg min-h-32"
              required
            />


            {/* Required Skills */}

            <input
              type="text"
              name="requiredSkills"
              value={editingJob.requiredSkills}
              onChange={handleEditChange}
              placeholder="Required Skills (React, JavaScript, MongoDB)"
              className="w-full border p-3 rounded-lg"
              required
            />


            {/* Experience */}

            <input
              type="text"
              name="experience"
              value={editingJob.experience}
              onChange={handleEditChange}
              placeholder="Experience"
              className="w-full border p-3 rounded-lg"
              required
            />


            {/* Location */}

            <input
              type="text"
              name="location"
              value={editingJob.location}
              onChange={handleEditChange}
              placeholder="Location"
              className="w-full border p-3 rounded-lg"
              required
            />


            {/* Salary */}

            <input
              type="text"
              name="salary"
              value={editingJob.salary || ""}
              onChange={handleEditChange}
              placeholder="Salary"
              className="w-full border p-3 rounded-lg"
            />


            {/* Job Type */}

            <select
              name="jobType"
              value={editingJob.jobType}
              onChange={handleEditChange}
              className="w-full border p-3 rounded-lg"
            >

              <option value="Full-time">
                Full-time
              </option>

              <option value="Part-time">
                Part-time
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Contract">
                Contract
              </option>

            </select>


            {/* Buttons */}

            <div className="flex gap-3 pt-3">

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Update Job
              </button>


              <button
                type="button"
                onClick={() => setEditingJob(null)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      )}


      {/* ======================================
          JOB LIST
      ====================================== */}

      {jobs.length === 0 ? (

        <p className="text-gray-600">
          You have not posted any jobs.
        </p>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow"
            >

              <h2 className="text-xl font-bold">
                {job.title}
              </h2>


              <p className="text-gray-600">
                {job.company}
              </p>


              <p className="mt-2">
                📍 {job.location}
              </p>


              <p className="mt-1 text-gray-500">
                💼 {job.jobType}
              </p>


              <p className="mt-1 text-gray-500">
                💰 {job.salary || "Not specified"}
              </p>


              {/* Skills */}

              <div className="flex flex-wrap gap-2 mt-4">

                {job.requiredSkills?.map(
                  (skill, index) => (

                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>


              {/* Buttons */}

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => startEdit(job)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  ✏️ Edit
                </button>


                <button
                  onClick={() => deleteJob(job._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}
/* =========================================================
   AI RESUME ANALYZER
========================================================= */

function AIResumeAnalyzer() {

  const [resume, setResume] = useState(null);

  const [analysis, setAnalysis] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const analyzeResume = async () => {

    setError("");
    setAnalysis("");


    if (!resume) {

      setError("Please select a PDF resume.");

      return;

    }


    if (resume.type !== "application/pdf") {

      setError("Only PDF resumes are allowed.");

      return;

    }


    try {

      const token = localStorage.getItem("token");


      if (!token) {

        setError("Please login as a Job Seeker.");

        return;

      }


      setLoading(true);


      const formData = new FormData();

      formData.append(
        "resume",
        resume
      );

      const response = await axios.post(
  "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/ai/analyze-resume",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      setAnalysis(
        response.data.analysis
      );


    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to analyze resume."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-4">
        🤖 AI Resume Analyzer
      </h1>

      <p className="text-gray-600 mb-8">
        Upload your resume and get an AI-powered professional analysis.
      </p>


      <div className="bg-white p-8 rounded-xl shadow">

        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={(e) => {

            setResume(e.target.files[0]);

            setAnalysis("");

            setError("");

          }}
          className="w-full border p-3 rounded-lg"
        />


        {resume && (

          <p className="mt-3 text-gray-600">
            Selected: <strong>{resume.name}</strong>
          </p>

        )}


        {error && (

          <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-5">
            {error}
          </div>

        )}


        <button
          onClick={analyzeResume}
          disabled={loading || !resume}
          className="mt-5 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {loading
            ? "Analyzing Resume..."
            : "Analyze Resume"}
        </button>


        {analysis && (

          <div className="mt-8 border rounded-xl p-6 bg-gray-50">

            <h2 className="text-2xl font-bold text-purple-700 mb-5">
              AI Resume Analysis
            </h2>

            <div className="whitespace-pre-line text-gray-700">
              {analysis}
            </div>

          </div>

        )}

      </div>

    </div>

  );

}
/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchAdminData = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login as Admin.");
        return;
      }


      const headers = {
        Authorization: `Bearer ${token}`,
      };


      // Get statistics
      const statsResponse = await axios.get(
        "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/admin/stats"
    
        { headers }
      );


      // Get users
      const usersResponse = await axios.get(
        "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/admin/users"

        { headers }
      );


      // Get jobs
      const jobsResponse = await axios.get(
        "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/jobs"
      
        { headers }
      );


      // Get applications
      const applicationsResponse = await axios.get(
        "https://ai-resume-job-matching-platform-backend-1.onrender.com/api/admin/applications",
        { headers }
      );


      setStats(statsResponse.data);

      setUsers(
        usersResponse.data.users ||
        usersResponse.data
      );

      setJobs(
        jobsResponse.data.jobs ||
        jobsResponse.data
      );

      setApplications(
        applicationsResponse.data.applications ||
        applicationsResponse.data
      );


    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to load admin dashboard."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchAdminData();

  }, []);


  /* =====================================================
     DELETE USER
  ===================================================== */

  const deleteUser = async (userId) => {

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }


    try {

      const token = localStorage.getItem("token");


      await axios.delete(
        `https://ai-resume-job-matching-platform-backend-1.onrender.com/api/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      fetchAdminData();


    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Failed to delete user."
      );

    }

  };


  /* =====================================================
     DELETE JOB
  ===================================================== */

  const deleteJob = async (jobId) => {

    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }


    try {

      const token = localStorage.getItem("token");


      await axios.delete(
        `https://ai-resume-job-matching-platform-backend-1.onrender.com/api/admin/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      fetchAdminData();


    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Failed to delete job."
      );

    }

  };


  if (loading) {

    return (

      <div className="text-center py-20">

        <p className="text-xl">
          Loading Admin Dashboard...
        </p>

      </div>

    );

  }


  return (

    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* PAGE TITLE */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          👑 Admin Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Manage users, jobs and applications.
        </p>

      </div>


      {/* ERROR */}

      {error && (

        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>

      )}


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">


        {/* USERS */}

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500">
            Total Users
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats?.users || 0}
          </p>

        </div>


        {/* JOB SEEKERS */}

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500">
            Job Seekers
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats?.jobseekers || 0}
          </p>

        </div>


        {/* RECRUITERS */}

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500">
            Recruiters
          </p>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats?.recruiters || 0}
          </p>

        </div>


        {/* ADMINS */}

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500">
            Admins
          </p>

          <p className="text-3xl font-bold text-orange-600 mt-2">
            {stats?.admins || 0}
          </p>

        </div>


        {/* JOBS */}

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500">
            Total Jobs
          </p>

          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {stats?.jobs || 0}
          </p>

        </div>


        {/* APPLICATIONS */}

        <div className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500">
            Applications
          </p>

          <p className="text-3xl font-bold text-pink-600 mt-2">
            {stats?.applications || 0}
          </p>

        </div>

      </div>


      {/* =================================================
          USERS
      ================================================= */}

      <section className="mb-12">

        <h2 className="text-2xl font-bold mb-5">
          👥 Users
        </h2>


        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Role
                </th>

                <th className="text-left p-4">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                  className="border-t"
                >

                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {user.role}
                    </span>

                  </td>

                  <td className="p-4">

                    {user.role !== "admin" && (

                      <button
                        onClick={() =>
                          deleteUser(user._id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>


      {/* =================================================
          JOBS
      ================================================= */}

      <section className="mb-12">

        <h2 className="text-2xl font-bold mb-5">
          💼 Jobs
        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="bg-white rounded-xl shadow p-6"
            >

              <h3 className="text-xl font-bold">
                {job.title}
              </h3>

              <p className="text-gray-600 mt-1">
                {job.company}
              </p>

              <p className="text-gray-500 mt-2">
                📍 {job.location}
              </p>

              <p className="text-gray-500 mt-1">
                Recruiter:{" "}
                {job.recruiterId?.name || "Unknown"}
              </p>


              <button
                onClick={() =>
                  deleteJob(job._id)
                }
                className="mt-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete Job
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* =================================================
          APPLICATIONS
      ================================================= */}

      <section>

        <h2 className="text-2xl font-bold mb-5">
          📄 Applications
        </h2>


        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Applicant
                </th>

                <th className="text-left p-4">
                  Job
                </th>

                <th className="text-left p-4">
                  Company
                </th>

                <th className="text-left p-4">
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {applications.map((application) => (

                <tr
                  key={application._id}
                  className="border-t"
                >

                  <td className="p-4">

                    <p className="font-semibold">
                      {application.applicantId?.name}
                    </p>

                    <p className="text-gray-500 text-sm">
                      {application.applicantId?.email}
                    </p>

                  </td>


                  <td className="p-4">
                    {application.jobId?.title}
                  </td>


                  <td className="p-4">
                    {application.jobId?.company}
                  </td>


                  <td className="p-4">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {application.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>

  );

}


export default App;