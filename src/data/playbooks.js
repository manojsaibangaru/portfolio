const PLAYBOOKS = {
  PHISHING_TRIAGE: {
    title: "PHISHING_TRIAGE",
    description: "Parse indicators, enrich, search, and recommend action.",
    steps: [
      { name: "ingest_email", tool: "SOAR::email_parser", output: "parsed headers, urls, attachments", ms: 500 },
      { name: "extract_iocs", tool: "SOAR::ioc_extract", output: "extracted urls, domains, hashes", ms: 650 },
      { name: "enrich_url", tool: "Intel::urlscan", output: "urlscan snapshot + verdict", ms: 700 },
      { name: "enrich_hash", tool: "Intel::virustotal", output: "hash reputation + engines hit", ms: 700 },
      { name: "search_recipients", tool: "SIEM::splunk", output: "searched recipients + click telemetry", ms: 650 },
      { name: "containment_reco", tool: "IR::runbook", output: "recommend quarantine + reset creds (if clicked)", ms: 600 },
      { name: "case_update", tool: "ITSM::servicenow", output: "case updated with IOCs + next steps", ms: 520 },
    ],
  },
  ALERT_ENRICH: {
    title: "ALERT_ENRICH",
    description: "Enrich a detection with identity, asset, and intel context.",
    steps: [
      { name: "asset_lookup", tool: "CMDB::asset_lookup", output: "resolved host owner + criticality", ms: 520 },
      { name: "geoip_asn", tool: "Intel::geoip", output: "source IP geo + ASN", ms: 480 },
      { name: "whois_domain", tool: "Intel::whois", output: "domain registration + age", ms: 520 },
      { name: "lookup_iocs", tool: "Intel::multi_lookup", output: "IOC reputations aggregated", ms: 680 },
      { name: "timeline", tool: "SOAR::timeline", output: "built incident timeline (auth + endpoint + cloud)", ms: 720 },
      { name: "ticket_update", tool: "ITSM::servicenow", output: "enrichment attached + analyst notes", ms: 520 },
    ],
  },
  ACCOUNT_LOCKDOWN: {
    title: "ACCOUNT_LOCKDOWN",
    description: "Contain suspected account compromise in a safe, auditable way.",
    steps: [
      { name: "risk_check", tool: "IAM::risk_engine", output: "risk score computed + anomalies detected", ms: 600 },
      { name: "disable_account", tool: "IAM::disable_user", output: "account temporarily disabled", ms: 650 },
      { name: "revoke_sessions", tool: "IAM::revoke_tokens", output: "sessions revoked (M365/Azure)", ms: 650 },
      { name: "force_mfa", tool: "IAM::mfa_policy", output: "MFA enforcement verified", ms: 600 },
      { name: "hunt_pivot", tool: "SIEM::splunk", output: "pivoted across auth sources for lateral movement", ms: 720 },
      { name: "case_update", tool: "ITSM::servicenow", output: "containment actions logged + approvals noted", ms: 520 },
    ],
  },
  CONTAINMENT: {
    title: "CONTAINMENT",
    description: "Isolate endpoint / block IOC with change logging.",
    steps: [
      { name: "edr_isolate", tool: "EDR::isolate_host", output: "endpoint isolated (network containment)", ms: 720 },
      { name: "block_ioc", tool: "FW::block_ioc", output: "IOC blocked at edge (simulated)", ms: 650 },
      { name: "collect_evidence", tool: "DFIR::collect", output: "collected triage artifacts (process, net, logs)", ms: 720 },
      { name: "notify", tool: "SOAR::notify", output: "notified on-call + stakeholders", ms: 520 },
      { name: "case_update", tool: "ITSM::servicenow", output: "timeline + actions appended to case", ms: 520 },
    ],
  },
}

export function listPlaybooks() {
  return Object.keys(PLAYBOOKS)
}

export function getPlaybook(id) {
  return PLAYBOOKS[id] || null
}

