// Real-world Incident Response scenarios with full IR lifecycle
// Each scenario maps through: DETECT → TRIAGE → ENRICH → CONTAIN → REMEDIATE → CLOSE

export const IR_PHASES = [
  { id: "detect", label: "DETECT", description: "Alert Received" },
  { id: "triage", label: "TRIAGE", description: "Validate & Scope" },
  { id: "enrich", label: "ENRICH", description: "Context & Intel" },
  { id: "contain", label: "CONTAIN", description: "Isolate Threat" },
  { id: "remediate", label: "REMEDIATE", description: "Fix & Recover" },
  { id: "close", label: "CLOSE", description: "Document & Learn" },
]

export const IR_SCENARIOS = [
  {
    id: "phishing_attack",
    title: "Phishing Campaign with Malicious Attachment",
    severity: "HIGH",
    source: "Email Gateway + User Report",
    mitre: "T1566.001 - Spearphishing Attachment",
    phases: {
      detect: {
        duration: 800,
        tool: "Email Security Gateway",
        action: "Suspicious attachment detected in email to finance team",
        output: "SHA256: 3f7a8b... flagged by sandbox",
      },
      triage: {
        duration: 1000,
        tool: "SIEM::Splunk",
        action: "Correlate email logs, identify 12 recipients",
        output: "3 users clicked link, 1 opened attachment",
      },
      enrich: {
        duration: 1200,
        tool: "Intel::VirusTotal + URLScan",
        action: "Hash reputation check, URL detonation",
        output: "Malicious: 47/72 engines, C2 domain identified",
      },
      contain: {
        duration: 900,
        tool: "Email::M365 + EDR::Defender",
        action: "Quarantine emails, isolate affected endpoints",
        output: "12 emails quarantined, 1 endpoint isolated",
      },
      remediate: {
        duration: 1100,
        tool: "IAM::Azure AD + IT::SCCM",
        action: "Reset credentials, reimage affected workstation",
        output: "Passwords reset, endpoint reimaged, IOCs blocked",
      },
      close: {
        duration: 700,
        tool: "ITSM::ServiceNow",
        action: "Document timeline, update detection rules",
        output: "Case closed, new detection rule deployed",
      },
    },
  },
  {
    id: "brute_force_vpn",
    title: "Brute Force Attack on VPN Gateway",
    severity: "HIGH",
    source: "VPN Logs + SIEM Alert",
    mitre: "T1110.001 - Password Guessing",
    phases: {
      detect: {
        duration: 700,
        tool: "SIEM::Splunk",
        action: "Anomaly detection: 500+ failed auth attempts from single IP",
        output: "Source: 185.234.x.x (Russia), Target: VPN gateway",
      },
      triage: {
        duration: 900,
        tool: "SOAR::Phantom",
        action: "Validate alert, check for successful logins",
        output: "2 successful logins after failed attempts - CRITICAL",
      },
      enrich: {
        duration: 1000,
        tool: "Intel::AbuseIPDB + GeoIP",
        action: "IP reputation, geolocation, ASN lookup",
        output: "IP flagged malicious, Tor exit node, ASN: AS12345",
      },
      contain: {
        duration: 800,
        tool: "Firewall::Palo Alto + IAM::Azure AD",
        action: "Block source IP, disable compromised accounts",
        output: "IP blocked at perimeter, 2 accounts disabled",
      },
      remediate: {
        duration: 1200,
        tool: "IAM::Azure AD + MFA",
        action: "Force password reset, enforce MFA on VPN",
        output: "Passwords rotated, MFA enforced for all VPN users",
      },
      close: {
        duration: 600,
        tool: "ITSM::ServiceNow",
        action: "Document attack, update firewall rules",
        output: "GeoIP blocking enabled, case closed",
      },
    },
  },
  {
    id: "ransomware_detected",
    title: "Ransomware Detected on Endpoint",
    severity: "CRITICAL",
    source: "EDR Alert + User Report",
    mitre: "T1486 - Data Encrypted for Impact",
    phases: {
      detect: {
        duration: 600,
        tool: "EDR::Microsoft Defender",
        action: "Behavioral detection: mass file encryption",
        output: "Process: update.exe, 200+ files encrypted in 30s",
      },
      triage: {
        duration: 800,
        tool: "SIEM::Splunk + EDR",
        action: "Assess blast radius, identify patient zero",
        output: "1 endpoint affected, no lateral movement detected",
      },
      enrich: {
        duration: 1100,
        tool: "Intel::VirusTotal + Sandbox",
        action: "Malware family identification, IOC extraction",
        output: "LockBit variant, C2: evil-domain.com, BTC wallet identified",
      },
      contain: {
        duration: 700,
        tool: "EDR::Defender + Network::Firewall",
        action: "Isolate endpoint, block C2 domains",
        output: "Endpoint quarantined, C2 blocked at DNS and firewall",
      },
      remediate: {
        duration: 1300,
        tool: "IT::SCCM + Backup::Veeam",
        action: "Wipe and reimage, restore from clean backup",
        output: "Endpoint reimaged, data restored from backup (RPO: 4hrs)",
      },
      close: {
        duration: 800,
        tool: "ITSM::ServiceNow + Legal",
        action: "Document incident, notify stakeholders, lessons learned",
        output: "No data exfil confirmed, case closed, tabletop scheduled",
      },
    },
  },
  {
    id: "suspicious_powershell",
    title: "Suspicious PowerShell Execution",
    severity: "HIGH",
    source: "EDR + SIEM Correlation",
    mitre: "T1059.001 - PowerShell",
    phases: {
      detect: {
        duration: 750,
        tool: "EDR::Microsoft Defender",
        action: "Encoded PowerShell with network connection detected",
        output: "Base64 decoded: IEX (New-Object Net.WebClient).Download...",
      },
      triage: {
        duration: 950,
        tool: "SIEM::Splunk",
        action: "Check parent process, user context, timing",
        output: "Parent: outlook.exe (macro), User: jsmith, 3AM execution",
      },
      enrich: {
        duration: 1050,
        tool: "Sandbox::Any.Run + Intel",
        action: "Detonate payload, extract IOCs",
        output: "Cobalt Strike beacon, C2: 45.33.x.x:443",
      },
      contain: {
        duration: 850,
        tool: "EDR::Defender + IAM",
        action: "Kill process, isolate host, disable user",
        output: "Process terminated, host isolated, jsmith disabled",
      },
      remediate: {
        duration: 1150,
        tool: "DFIR::Velociraptor + IT",
        action: "Forensic collection, credential rotation, reimage",
        output: "Memory dump collected, all creds rotated, endpoint clean",
      },
      close: {
        duration: 650,
        tool: "ITSM::ServiceNow",
        action: "Timeline documented, detection improved",
        output: "New Sigma rule deployed, user retrained, case closed",
      },
    },
  },
  {
    id: "cloud_iam_anomaly",
    title: "Anomalous Cloud IAM Activity",
    severity: "HIGH",
    source: "AWS CloudTrail + UEBA",
    mitre: "T1078.004 - Cloud Accounts",
    phases: {
      detect: {
        duration: 800,
        tool: "SIEM::Splunk (CloudTrail)",
        action: "UEBA alert: unusual API calls from new location",
        output: "iam:CreateAccessKey from IP in Nigeria (first time)",
      },
      triage: {
        duration: 1000,
        tool: "AWS Console + SIEM",
        action: "Verify user identity, check MFA status",
        output: "User claims not them, MFA was not triggered - compromised",
      },
      enrich: {
        duration: 900,
        tool: "AWS CloudTrail + Intel",
        action: "Full API history, access key inventory",
        output: "New access key created, S3 ListBuckets called",
      },
      contain: {
        duration: 750,
        tool: "AWS IAM + Security Hub",
        action: "Revoke all sessions, delete rogue access keys",
        output: "Sessions revoked, 1 rogue key deleted, SCPs tightened",
      },
      remediate: {
        duration: 1100,
        tool: "AWS IAM + IT",
        action: "Rotate credentials, enable MFA enforcement",
        output: "Password reset, MFA enforced, GuardDuty alerts tuned",
      },
      close: {
        duration: 700,
        tool: "ITSM::ServiceNow",
        action: "Document, verify no data access",
        output: "No S3 data accessed, case closed, training assigned",
      },
    },
  },
  {
    id: "lateral_movement",
    title: "Lateral Movement via Pass-the-Hash",
    severity: "CRITICAL",
    source: "EDR + Active Directory Logs",
    mitre: "T1550.002 - Pass the Hash",
    phases: {
      detect: {
        duration: 700,
        tool: "SIEM::Splunk + EDR",
        action: "NTLM auth from unexpected source to multiple hosts",
        output: "svc_backup account auth to 15 servers in 2 minutes",
      },
      triage: {
        duration: 900,
        tool: "Active Directory + SIEM",
        action: "Verify legitimate activity, check account ownership",
        output: "svc_backup owner confirms no maintenance scheduled",
      },
      enrich: {
        duration: 1100,
        tool: "EDR::Defender + DFIR",
        action: "Trace source, identify hash dump method",
        output: "Source: WKS-042, mimikatz.exe detected in memory",
      },
      contain: {
        duration: 800,
        tool: "AD::PowerShell + EDR",
        action: "Disable account, isolate source and targets",
        output: "svc_backup disabled, 16 endpoints isolated",
      },
      remediate: {
        duration: 1400,
        tool: "AD + LAPS + IT",
        action: "Reset all local admin passwords, deploy LAPS",
        output: "KRBTGT rotated 2x, LAPS deployed, endpoints reimaged",
      },
      close: {
        duration: 800,
        tool: "ITSM::ServiceNow",
        action: "Root cause analysis, implement detection improvements",
        output: "Honey tokens deployed, case closed, purple team exercise",
      },
    },
  },
]
