# DNS
The `Domain Name System (DNS)` translates human-readable domain names (like example.com) into **IP addresses**.

**Domain** is the string of text that identifies a specific website, such as `google.com` or `facebook.com`.
 Every time you access a website from your web browser, a DNS query takes place and the DNS service maps the domain to the actual IP address where the website is `hosted`.

### Authoritative DNS
**Authoritative DNS** refers to the service whose nameservers provide the final answer mapping a hostname (such as `example.com` or `blog.example.com`) to the **IP address** that hosts the corresponding content or resources.

### DNS records
DNS records are instructions that live in the authoritative DNS servers and provide information about a zone. This includes what IP address is associated with a particular domain, but can also cover many other use cases, such as directing emails to a mail server or validating ownership of a domain.



# Proxy status
While your DNS records contain information about your domain, the proxy status controls whether HTTP/HTTPS traffic for that record routes through Cloudflare's network or goes directly to your origin server.

When a record is **Proxied,** Cloudflare sits between your visitors and your server — optimizing, caching, and protecting traffic along the way.
When a record is **DNS-only**, Cloudflare responds with your server's actual IP address and does not route HTTP/HTTPS traffic through its network.

### Benefits
When you set a DNS record to Proxied — shown as an orange cloud icon in the dashboard, also known as "orange-clouded" — Cloudflare can:
- Protect your origin server (the server hosting your website or application) from DDoS attacks .
- Optimize, cache, and protect all requests to your application.
- Apply your Cloudflare product configurations (such as WAF rules, caching, and redirect rules) to incoming traffic.