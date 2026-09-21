# DNS
The `Domain Name System (DNS)` translates human-readable domain names (like example.com) into **IP addresses**.

**Domain** is the string of text that identifies a specific website, such as `google.com` or `facebook.com`.
 Every time you access a website from your web browser, a DNS query takes place and the DNS service maps the domain to the actual IP address where the website is `hosted`.

### Authoritative DNS
**Authoritative DNS** refers to the service whose nameservers provide the final answer mapping a hostname (such as `example.com` or `blog.example.com`) to the **IP address** that hosts the corresponding content or resources.

### DNS records
DNS records are instructions that live in the authoritative DNS servers and provide information about a zone. This includes what IP address is associated with a particular domain, but can also cover many other use cases, such as directing emails to a mail server or validating ownership of a domain.


# DNS routing

Cloudflare `DNS routing` uses an orange-cloud proxy status to pass your domain's web traffic through Cloudflare's global network instead of sending it directly to your origin server.

**How Cloudflare DNS Routing Works**:
- `Proxied (Orange Cloud):` Cloudflare intercepts incoming HTTP/HTTPS traffic. This applies security features like the Web Application Firewall (WAF), DDoS protection, and CDN caching before sending requests safely to your server.
- `DNS-only (Grey Cloud):` Cloudflare acts strictly as a basic DNS resolver. It responds with your server's actual IP address, and traffic bypasses Cloudflare’s proxy network entirely.
- `Record Types:` Only A, AAAA, and CNAME records can be toggled between Proxied and DNS-only states. Other records like MX or TXT remain DNS-only by default.