export const profile = {
  name: "Manojsai Bangaru",
  headline: "Palo Alto Cortex XSOAR Engineer — Security Automation & SOAR Implementation",
  contact: {
    email: "manojsaibangaru@gmail.com",
    phone: "+1 940-597-9780",
    linkedInUrl: "https://www.linkedin.com/in/manojsaibangaru/",
  },
  opsShowcase: {
    incidents: [
      {
        title: "End-to-end XSOAR deployment (Enterprise SOC)",
        detail: "Led Cortex XSOAR implementation including Splunk SIEM and CrowdStrike Falcon EDR integrations for automated incident response.",
      },
      {
        title: "Automated phishing response playbook",
        detail: "Designed multi-stage playbook with alert ingestion, IOC enrichment, email quarantine, and user notification — reduced MTTR by 40%.",
      },
      {
        title: "CrowdStrike EDR integration & containment automation",
        detail: "Built automated host isolation, IOC blocking, and remediation workflows triggered by endpoint alerts.",
      },
    ],
    playbooks: [
      "PHISHING_TRIAGE::splunk_ingest → xsoar_enrich → crowdstrike_contain → notify_user",
      "ALERT_ENRICH::splunk_query → virustotal → asset_lookup → case_management",
      "EDR_RESPONSE::crowdstrike_isolate → ioc_block → remediation → ticket_close",
    ],
    huntQueries: [
      `index=auth (event=fail OR event=success) user=* | stats count dc(src_ip) by user | where count>40`,
      `index=crowdstrike eventType=DetectionSummaryEvent | stats count by ComputerName, Severity`,
      `index=xsoar playbook_status=* | stats count by playbook_name, status | where status="completed"`,
    ],
  },
  summary: [
    "Palo Alto Cortex XSOAR Engineer with 4+ years of experience delivering end-to-end SOAR implementations in enterprise SOC environments, driving automation, incident response efficiency, and measurable MTTR reductions.",
    "Hands-on experience deploying and configuring Cortex XSOAR in production environments, integrating with Splunk SIEM for alert ingestion and enrichment, and CrowdStrike Falcon EDR for automated detection and response.",
    "Proficient in designing and deploying automated incident response playbooks covering alert triage, IOC enrichment, threat containment, and remediation workflows aligned with SOC operational requirements.",
    "Skilled in developing custom XSOAR automations, scripts, and integrations using Python and REST APIs to extend platform capabilities and address organization-specific security use cases.",
    "Experienced in collaborating with SOC analysts, security engineers, and IT teams to align SOAR workflows with existing processes, optimizing playbooks to reduce analyst fatigue and improve response consistency.",
    "Strong background in supporting XSOAR go-live activities, post-implementation optimization, and creating technical documentation including runbooks, integration guides, and knowledge transfer materials.",
    "Familiar with additional security tooling including firewalls, email security platforms, IAM solutions, and threat intelligence feeds to enable comprehensive SOAR integrations.",
    "Exposure to cloud security tooling across AWS, Azure, and GCP, supporting hybrid SOC environments and cloud-native alert ingestion workflows.",
  ],
  skills: {
    "SOAR & Automation": {
      "Cortex XSOAR": ["Playbook design", "Integration development", "Automation scripts", "Incident layouts"],
      "Integrations": ["Splunk SIEM", "CrowdStrike Falcon EDR", "ServiceNow ITSM", "Threat intel platforms"],
      "Automation": [
        "Alert triage workflows",
        "IOC enrichment",
        "Containment actions",
        "Case management",
        "MTTR optimization",
      ],
    },
    "SIEM & Detection": {
      "Splunk SIEM": ["Alert ingestion", "SPL queries", "Correlation searches", "Dashboard creation"],
      "Alert Types": ["Phishing", "Endpoint threats", "Malware", "Suspicious activity", "Identity attacks"],
      "Detection": ["MITRE ATT&CK mapping", "Use case development", "False positive tuning"],
    },
    "EDR & Endpoint Security": {
      "CrowdStrike Falcon": ["Host isolation", "IOC handling", "Remediation actions", "Detection response"],
      "Endpoint Security": ["Microsoft Defender", "Endpoint hardening", "CIS Benchmarks"],
      "Response Actions": ["Automated containment", "Process termination", "Network isolation"],
    },
    "Scripting & Development": {
      Languages: ["Python", "Bash", "PowerShell"],
      "API Integrations": ["REST APIs", "XSOAR integrations", "Custom automations", "Webhook handlers"],
      Tooling: ["ServiceNow", "Git", "GitHub", "CI/CD pipelines"],
    },
    "Cloud & Infrastructure": {
      Cloud: ["AWS", "Azure", "GCP", "Cloud security monitoring"],
      "Identity & Access": ["IAM policies", "MFA/SSO", "OAuth/SAML"],
      Networking: ["TCP/IP", "DNS", "Firewall basics", "VPN"],
    },
  },
  experience: [
    {
      title: "Cortex XSOAR Engineer — Johnson & Johnson",
      location: "New Brunswick, New Jersey, USA",
      dates: "October 2024 — Present",
      bullets: [
        "Leading Cortex XSOAR implementation and configuration within the enterprise SOC, establishing automated incident response capabilities across security operations.",
        "Designing and deploying automated playbooks for alert triage, IOC enrichment, threat containment, and remediation, reducing manual analyst effort and improving response consistency.",
        "Integrating XSOAR with Splunk SIEM for real-time alert ingestion, log enrichment, and centralized case management, enabling streamlined SOC workflows.",
        "Configuring CrowdStrike Falcon EDR integration for automated response actions including host isolation, IOC blocking, and endpoint remediation triggered by detection alerts.",
        "Developing custom Python automations and REST API integrations to extend XSOAR capabilities for organization-specific security use cases and third-party tool connectivity.",
        "Collaborating with SOC analysts and security engineers to align SOAR workflows with operational requirements, optimizing playbooks based on analyst feedback and incident patterns.",
        "Supporting testing, go-live activities, and post-implementation optimization to ensure stable platform operations and continuous improvement of automation effectiveness.",
        "Creating technical documentation including playbook runbooks, integration guides, and knowledge transfer materials for SOC team enablement.",
      ],
    },
    {
      title: "SOAR Implementation Engineer — Accenture",
      location: "Bengaluru, Karnataka, India",
      dates: "August 2021 — July 2023",
      bullets: [
        "Delivered Cortex XSOAR and Splunk SOAR implementations across multiple enterprise client environments, integrating SOAR platforms with existing SIEM infrastructure for automated incident response.",
        "Designed and deployed 15+ automated playbooks covering phishing triage, malware analysis, endpoint containment, and alert enrichment, improving incident resolution efficiency by approximately 35%.",
        "Integrated XSOAR with Splunk SIEM for alert ingestion and enrichment, enabling automated correlation of security events and reducing manual triage workload.",
        "Configured CrowdStrike Falcon and Microsoft Defender EDR integrations for automated containment actions, including host isolation and IOC-based response workflows.",
        "Developed custom Python scripts and XSOAR integrations to connect third-party security tools, threat intelligence platforms, and ITSM systems with SOAR workflows.",
        "Collaborated with SOC teams to refine playbook logic based on operational feedback, optimizing automation flows to reduce MTTR by approximately 25%.",
        "Integrated SOAR platforms with ServiceNow for automated ticket creation, case updates, and incident tracking, improving visibility and audit compliance.",
        "Created and maintained technical documentation including implementation guides, playbook specifications, and SOC runbooks aligned with client security policies.",
        "Supported go-live activities and post-deployment optimization, validating playbook performance and tuning automations based on production incident data.",
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

