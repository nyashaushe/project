"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  fetchTeamMembers,
  fetchCompanyValues,
  TeamMember,
  CompanyValue,
} from "../../services/api/about";

const AboutPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [companyValues, setCompanyValues] = useState<CompanyValue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamResponse, valuesResponse] = await Promise.all([
          fetchTeamMembers(),
          fetchCompanyValues(),
        ]);
        setTeamMembers(teamResponse.data || []);
        setCompanyValues(valuesResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch about page data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">About Us</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Baobab Stack is a team of passionate technologists, designers, and
            strategists dedicated to helping businesses thrive in the digital
            era. Our mission is to empower organizations with innovative,
            scalable, and intelligent solutions that drive real results. With
            expertise in web development, AI automation, and digital marketing,
            we partner with clients to turn ambitious ideas into reality. We
            believe in transparency, collaboration, and delivering measurable
            value at every stage of your journey. We are committed to excellence
            and innovation in everything we do.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyValues.map((value) => (
              <div key={value.id} className="text-center">
                <h4 className="text-xl font-bold text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Our Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h4>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
