import React from 'react';
import { ArrowRight, Shield, Zap, Github, Twitter, CheckCircle2, Users, MessageSquare, Workflow, Activity } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

interface HomePageProps {
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-sb-darker">
          <div className="absolute inset-0 bg-gradient-to-r from-sb-green/20 to-transparent animate-gradient-x"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sb-dark/50 to-sb-darker"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(62,207,142,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 animate-fade-in">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight animate-slide-up">
              Accelerating technology
              <br />
              <span className="bg-gradient-to-r from-sb-green to-[#4FD1FF] text-transparent bg-clip-text">
                & People performance 
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-slide-up-delay">
            We’re a high-tech consulting company that puts people first — empowering talent to deliver exceptional 
            results and creating joy for both our clients and our teams.
            </p>
          </div>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-sb-green/10 rounded-full blur-3xl animate-orbit"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#4FD1FF]/10 rounded-full blur-3xl animate-orbit-reverse"></div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 bg-sb-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-sb-dark border-gray-800 p-8 rounded-xl border">
              <div className="bg-sb-slate w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">High-Tech Consulting for Team Augmentation</h3>
              <p className="text-gray-400">We specialize in high-tech consulting with a focus on team augmentation, providing skilled professionals to seamlessly integrate with your existing teams. Whether you need software engineers, cloud architects, data scientists, or DevOps experts, our consultants bring cutting-edge expertise and agility to accelerate your projects and scale your capabilities—on demand and with precision.</p>
            </div>
            <div className="bg-sb-dark border-gray-800 p-8 rounded-xl border">
              <div className="bg-sb-slate w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Specialized DevOps & DevSecOps Services</h3>
              <p className="text-gray-400">Our specialized DevOps and DevSecOps services are designed to streamline software delivery while embedding security at every stage of the development lifecycle. We help organizations automate infrastructure, optimize CI/CD pipelines, and implement secure-by-design practices—ensuring faster releases, higher reliability, and robust protection against evolving threats.</p>
            </div>
            <div className="bg-sb-dark border-gray-800 p-8 rounded-xl border">
              <div className="bg-sb-slate w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">AI Agentic Cybersecurity</h3>
              <p className="text-gray-400">Our AI Agentic Cybersecurity service leverages intelligent, autonomous agents to detect, analyze, and respond to threats in real-time. By combining advanced machine learning with behavior-based monitoring, we deliver proactive defense mechanisms that adapt continuously to emerging risks—empowering organizations with faster incident response, reduced attack surfaces, and smarter security operations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div id="process" className="py-20 bg-sb-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our People Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-sb-slate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Workflow className="h-8 w-8 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Atract and Interview</h3>
              <p className="text-gray-400">With our community of over 100,000 members, we can filter and screen the best candidates for jobs.</p>
            </div>
            <div className="text-center">
              <div className="bg-sb-slate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Onboarding and training </h3>
              <p className="text-gray-400">We provide training and shadowing processes with other experienced people in the same role.</p>
            </div>

            <div className="text-center">
              <div className="bg-sb-slate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Deploy</h3>
              <p className="text-gray-400">Our employees begin working with our clients in dedicated role areas. We count with periodic reviews, on the first 30-60-90 days</p>
            </div>
            <div className="text-center">
              <div className="bg-sb-slate w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-sb-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Following Up</h3>
              <p className="text-gray-400">We carry out continuous support to our employees, with technical sessions and therapeutic sessions, in order to maintain the happiness and performance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Section */}
      <div id="animation" className="relative min-h-[70vh] flex items-center">
        <AnimatedBackground darkMode={darkMode} />
        <div className="w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-sb-dark/50 to-sb-darker">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Interactive Background
              <br />
              Animation Showcase
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              A dynamic background animation featuring geometric shapes with smooth transitions and connections.
              Toggle dark mode to see different color schemes.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-sb-green text-black font-medium px-6 py-3 rounded-lg hover:bg-sb-green/90 flex items-center">
                Try it Now <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border border-gray-700 text-gray-300 hover:bg-sb-slate px-6 py-3 rounded-lg">
                View Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about" className="py-20 bg-sb-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">About Us</h2>
              <p className="text-gray-400 mb-4">
                We're a team of passionate developers and engineers dedicated to making API management simple and secure.
                With years of experience in enterprise solutions, we understand the challenges of modern API development.
              </p>
              <p className="text-gray-400 mb-6">
                Our mission is to provide developers with the tools they need to build and manage world-class APIs.
              </p>
              <div className="flex items-center space-x-4">
                <Users className="h-12 w-12 text-sb-green" />
                <div>
                  <h4 className="text-white font-semibold">Expert Team</h4>
                  <p className="text-gray-400">20+ years of combined experience</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration" 
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>




    </>
  );
};

export default HomePage;