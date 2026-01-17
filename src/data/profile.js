export const profile = {
  name: "Manojsai Bangaru",
  headline: "Security Analyst — SIEM, SOAR & SOC Operations",
  contact: {
    email: "manojsaibangaru@gmail.com",
    phone: "+1 940-597-9780",
    linkedInUrl: "https://www.linkedin.com/in/manojsaibangaru/",
  },
  opsShowcase: {
    incidents: [
      {
        title: "Identity attack investigation (hybrid AD)",
        detail: "Kerberoasting / Pass-the-Hash / suspicious privilege escalation — triage, scoping, containment, closure.",
      },
      {
        title: "Cloud detection + response (AWS / Azure)",
        detail: "Correlated CloudTrail + Entra ID + endpoint telemetry to confirm anomalous auth bursts and reduce noise.",
      },
      {
        title: "Phishing & email threat response",
        detail: "Enrichment, IOC pivoting, user remediation, and ticket hygiene with repeatable runbooks.",
      },
    ],
    playbooks: [
      "PHISHING_TRIAGE::enrich_urls → extract_iocs → notify_user",
      "ALERT_ENRICH::whois → virustotal → asset_lookup → ticket_update",
      "CONTAINMENT::disable_account → isolate_endpoint → block_ioc",
    ],
    huntQueries: [
      `index=auth (event=fail OR event=success) user=* | stats count dc(src_ip) by user | where count>40`,
      `index=cloudtrail eventName=ConsoleLogin errorMessage!=success | stats count by userIdentity.arn, sourceIPAddress`,
      `index=edr process=* | search parent_process IN ("powershell.exe","cmd.exe") | stats count by host, user`,
    ],
  },
  summary: [
    "CompTIA Security+ certified Cybersecurity Analyst with 4+ years of experience across SOC operations, threat detection, incident response, vulnerability management, and digital forensics in healthcare and global consulting environments.",
    "Hands-on experience deploying and operating SIEM/SOAR platforms, integrating Splunk SIEM and Splunk SOAR (Phantom) into centralized SOC operations for real-time monitoring and automated incident response.",
    "Strong background in designing, tuning, and optimizing detection rules, correlation searches, and IDS/IPS signatures mapped to MITRE ATT&CK, reducing false positives, and improving detection accuracy.",
    "Proficient in developing and maintaining SOAR playbooks and Python-based automation to enrich alerts, collect evidence, and orchestrate remediation, achieving measurable reductions in mean time to respond (MTTR).",
    "Skilled in vulnerability management and risk assessment using tools such as Nessus, Tenable, Rapid7, and Nmap, with a track record of driving remediation for high-severity findings.",
    "Familiar with cloud and endpoint security controls across AWS and Azure, including IAM policies, MFA/SSO, EDR, endpoint hardening, and alignment with CIS Benchmarks.",
    "Experience supporting cloud security tooling implementation and ongoing operations across Microsoft 365, Azure, and hybrid environments, including SIEM, EDR, email security, MFA, and vulnerability management platforms.",
    "Knowledgeable in security governance and compliance practices aligned with ISO 27001, HIPAA, PCI-DSS, and NIST CSF, supporting audits, documentation, and process standardization.",
  ],
  skills: {
    "Security Operations & Monitoring": {
      SIEM: ["Splunk", "Wazuh", "Kibana", "SQL-style log analytics", "SPL-based searches"],
      SOAR: ["Splunk SOAR (Phantom)", "Palo Alto Cortex XSOAR", "playbook design", "automation workflows"],
      "Threat Detection": [
        "IDS/IPS (Snort)",
        "TCPDump",
        "Wireshark",
        "email threat analysis",
        "OSINT",
        "MITRE ATT&CK–based use case creation",
      ],
    },
    "Vulnerability, Risk & Forensics": {
      "Vulnerability Management": ["Nessus", "Tenable", "Rapid7", "Nmap", "CVSS-based prioritization", "remediation tracking"],
      "Risk & Governance": ["Threat modeling", "risk assessments", "ISO 27001 control validation"],
      "Forensics & DFIR": ["Chain of custody", "phishing response", "malware analysis support"],
    },
    "Cloud, Endpoint & Platform Security": {
      Cloud: ["AWS", "Azure", "cloud security monitoring", "cloud-native logs", "alerts"],
      "Identity & Access": ["IAM", "MFA", "SSO", "OAuth/SAML", "policy review and refinement"],
      "Endpoint & Network": [
        "EDR (e.g., Microsoft Defender)",
        "endpoint hardening",
        "CIS Benchmarks",
        "firewall and VPN basics",
      ],
    },
    "Scripting, Automation & Tooling": {
      Languages: ["Python", "Bash", "PowerShell"],
      Automation: ["SOAR playbooks", "REST API integrations", "log parsing scripts", "CI/CD-integrated security monitoring"],
      Tooling: ["ServiceNow", "Git", "GitHub", "basic CI/CD environments"],
    },
    "Networking & Systems": {
      Networking: ["TCP/IP", "DNS", "VPN", "LAN/WAN concepts", "basic firewall configuration"],
      Systems: ["Windows", "Linux (including Kali)", "macOS", "system and audit log analysis"],
    },
  },
  experience: [
    {
      title: "Security Analyst — Johnson & Johnson",
      location: "New Brunswick, New Jersey, USA",
      dates: "October 2024 — Present",
      bullets: [
        "Designed, tuned, and operationalized threat detection rules in SIEM and IDS/IPS platforms using MITRE ATT&CK–mapped hypotheses, improving detection accuracy and reducing false positives across enterprise and cloud workloads.",
        "Investigated identity-based attacks in hybrid Active Directory environments, including Kerberoasting, Pass-the-Hash, Golden Ticket, and suspicious privilege escalation activity using Microsoft Defender and SIEM telemetry.",
        "Performed end-to-end incident response including alert triage, scoping, containment, eradication, and closure, coordinating with infrastructure, IAM, and application teams for high-severity incidents.",
        "Conducted threat research and hypothesis-driven threat hunting by correlating telemetry from Linux/Windows systems, AWS services, network sensors, and endpoint tools to uncover malicious activity not fully prevented by existing controls.",
        "Developed and maintained Python-based detection and response automations integrated with SIEM/SOAR platforms to accelerate alert enrichment, evidence collection, and standardized response workflows.",
        "Partnered with engineering and platform teams to identify logging and visibility gaps, driving improvements in telemetry coverage, and ensuring incident responders had reliable, actionable data.",
        "Utilized SQL-style log analytics and SPL searches to validate detections, evaluate rule performance, and support post-incident reviews and reporting.",
        "Supported on-call SOC rotations, documenting detection logic, runbooks, and lessons learned to continuously improve SOC processes and playbook quality.",
      ],
    },
    {
      title: "Security Delivery Associate — Accenture",
      location: "Bengaluru, Karnataka, India",
      dates: "August 2021 — July 2023",
      bullets: [
        "Assisted in deploying and operating enterprise security solutions across multiple client environments, integrating Splunk SIEM and Splunk SOAR (Phantom) into centralized SOC operations for real-time monitoring and automated response.",
        "Monitored, triaged, and investigated security alerts using Splunk SIEM and SOAR, escalating validated incidents in accordance with defined SOC runbooks and incident response procedures.",
        "Analyzed and correlated security logs to identify suspicious activity and threat patterns, contributing to a reduction in false positives through alert tuning and refinement of detection use cases.",
        "Designed and implemented more than 10 SOAR (Phantom) automation playbooks for malware analysis, exploit detection, and automated enrichment, improving incident resolution efficiency by approximately 30%.",
        "Enhanced SOAR platform capabilities by developing custom Python automation functions and optimizing Splunk SPL queries for client-specific detection requirements, reducing mean time to respond (MTTR) by approximately 20%.",
        "Created and maintained SOC documentation including SOPs, runbooks, and automation playbooks, aligning processes with NIST and ISO 27001 frameworks.",
        "Collaborated with ServiceNow and SOC teams to integrate SOAR workflows with incident case management, improving visibility, ticket quality, and operational efficiency.",
        "Mentored junior team members on SOC processes, Splunk search best practices, and SOAR playbook usage, providing operational support for client implementations and onboarding.",
        "Participated in change and release activities for SIEM/SOAR enhancements, validating new detections and automation flows in test environments before production rollout.",
      ],
    },
    {
      title: "Security Intern — Sonata Software",
      location: "Bengaluru, Karnataka, India",
      dates: "October 2020 — June 2021",
      bullets: [
        "Assisted SOC engineers in integrating SIEM alerts with SOAR by helping configure data ingestion pipelines and basic playbooks for automated alert enrichment and notifications.",
        "Supported the development and validation of Splunk SPL queries and Wazuh/Kibana searches to correlate events from endpoint, network, and cloud logs and highlight suspicious activity.",
        "Helped build and test SOAR workflows for routine incidents such as phishing alerts, malware detections, and user access anomalies under guidance from senior analysts.",
        "Contributed to Python scripts and REST API integrations used to pull additional context from security tools and external services during investigations.",
        "Monitored SOC dashboards, reviewed security alerts, and escalated potential incidents following defined triage checklists and severity criteria.",
        "Investigated advanced security incidents across Microsoft 365 and hybrid Azure environments using Microsoft Defender for Endpoint and Azure Sentinel.",
        "Assisted with maintaining SOC documentation, including updating runbooks, playbook references, and detection rule catalogs.",
        "Participated in incident post-mortems and tuning sessions to refine alert thresholds, improve correlation logic, and reduce false positives.",
        "Helped track remediation status using ticketing tools, ensuring follow-up and closure of security findings in coordination with IT teams.",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      school: "University of North Texas",
      dates: "August 2023 — May 2025",
    },
    {
      degree: "Bachelor of Technology in Electronics and Communication",
      school: "GITAM University",
      dates: "July 2017 — May 2021",
    },
  ],
  certifications: [
    "CompTIA Security+",
    "Cortex XSOAR 6.2 Automation and Orchestration",
    "Google Cybersecurity Professional Certificate",
    "Qualys VMDR",
  ],
}

