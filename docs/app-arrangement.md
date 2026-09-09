# App Arrangement & Platform Structure — Developer / App Development Brief

## 1. Purpose of the Platform
The platform is a skills, talent, jobs and gigs marketplace that connects people who have skills with individuals, businesses and companies looking to hire them.

Two main user groups:
- **Talent / Service Providers** — showcase skills, find jobs, receive gigs and get hired.
- **Clients / Employers** — discover talent and hire people for jobs, projects or specific services.

The platform should not function only as a job board. A major part of the experience should be talent discovery through portfolios, showcase content and previous work.

## 2. Main User Experience
When a user opens the app, the two main paths should be immediately clear:
- **FIND TALENT** — I need someone to do a job.
- **FIND WORK** — I have a skill and I am looking for opportunities.

The homepage should also provide organized skill categories so users can quickly find the type of talent they need.

## 3. Skill Categories
Videography, Video Editing, Photography, Graphic Design, Web Design, Software Development, Script Writing, Copywriting, UGC Creation, Animation, Voice Over, Social Media Management, Digital Marketing, Virtual Assistance, Other Digital Skills.

## 4. Talent Category Pages
When a client selects a category such as Video Editing, the app should display a well-organized list/grid/feed of people offering that skill.

Each talent card should show:
- Profile picture and name
- Main skill
- Short description
- Location where relevant
- Remote availability
- Rating/reviews
- Starting price or service price where applicable
- Availability status
- Portfolio/showcase preview

Selecting a talent card should open the person's full profile and portfolio.

## 5. Portfolio & Showcase System
This is one of the most important features of the platform. Talent should not only describe what they can do; they should be able to show previous work.

Examples: video editors can showcase edits; videographers can showcase previous videos; web designers can display previous websites; graphic designers can display designs; UGC creators can show UGC examples.

**Showcase Video**
For skills where video is useful, the user should be able to upload a short showcase video directly to the platform. The upload should have a reasonable duration and file-size limit, with automatic compression where appropriate.

Users should also be able to add external portfolio links such as YouTube, Vimeo, Behance, personal websites, GitHub and other relevant platforms.

## 6. Talent Profile
Each talent profile should function like a mini portfolio website.

| Field | Description |
|---|---|
| Name | e.g. David |
| Main Skill | e.g. Video Editor |
| About | Short description of experience and services |
| Skills | e.g. Premiere Pro, DaVinci Resolve, After Effects |
| Services | e.g. YouTube Editing, Short-form Editing, Commercial Editing |
| Portfolio | Previous projects and showcase content |
| Experience | Relevant work history |
| Reviews | Ratings and client reviews |
| Availability | Available / Busy / Not Available |
| Starting Price | Price or price range where applicable |
| Action | Contact / Hire |

## 7. Job / Gig Posting
Clients and companies should be able to create job or gig postings.

A job/gig posting should include:
- Job title
- Category
- Description
- Budget or price range
- Deadline
- Remote / on-site requirement
- Required skills
- Attachments or reference files where applicable

After publishing, relevant talent should be able to discover the opportunity and apply.

## 8. Job Posting + Talent Discovery
The two functions should work together. After a client posts a job, the platform should recommend suitable talent instead of simply waiting for applications.

Example: A client posts "YouTube Video Editor Needed." The system can show Recommended Talent with profile, showcase, portfolio, rating and a Hire/Contact option.

The client can either wait for applications or browse recommended talent immediately.

## 9. Talent Should Find Jobs
Talent should have a dedicated area for available jobs and gigs. A video editor, for example, should be able to see relevant remote jobs, budgets and deadlines and apply directly.

## 10. Recommended Talent
The platform should eventually recommend talent based on category, required skills, budget, location, remote/on-site requirement, experience and availability.

The recommendation system can become more accurate over time using activity, completed jobs, ratings and successful hires.

## 11. Two Main Actions

**FIND TALENT**
Choose Category → Browse Talent → View Profile → View Portfolio → Contact / Hire

**FIND WORK**
Create Profile → Add Skills → Upload Portfolio / Showcase → Browse Jobs → Apply → Get Hired

## 12. Do Not Force Every User to Upload Video
The portfolio format should depend on the skill. Video is useful for video editors, videographers and UGC creators. Graphic designers can use images, web designers can use screenshots and links, writers can use writing samples, voice-over artists can use audio, and developers can use project portfolios or GitHub links.

**Principle: Show what you can do.** The platform should not require every profession to use video.

## 13. Homepage Arrangement

| Section | Purpose |
|---|---|
| Header / Search | Search for a skill, service, talent or job |
| Find Talent | Hire someone for a project or service |
| Find Work | Discover jobs and gigs |
| Explore Skills | Browse organized skill categories |
| Featured Talent | Show selected talent with showcase/portfolio previews |
| Latest Jobs | Display recently posted opportunities |
| Trending Skills | Highlight active/popular categories |

## 14. Storage & Media Considerations
Because the platform will contain portfolios and showcase content, storage must be considered from the beginning.
- Limit showcase video duration and upload size.
- Automatically compress uploaded videos where appropriate.
- Generate thumbnails/previews.
- Use scalable cloud storage/CDN infrastructure for media.
- Allow external portfolio links for larger projects.
- Allow users to replace or delete old portfolio files.
- Monitor storage usage as the platform grows.

The media system should be designed to scale without requiring a complete rebuild as the number of users and portfolios increases.

## 15. Overall Platform Structure
Talent Profiles → Skills/Categories → Portfolio & Showcase → Jobs/Gigs → Applications → Contact/Hiring → Completed Work → Reviews & Reputation

These components should work together as one ecosystem rather than operating as separate features.

## 16. Core Product Concept
**SHOW YOUR SKILL. GET DISCOVERED. GET HIRED.**

The platform should make it easy for someone to discover talented people by seeing their actual work, while giving those talented people access to jobs, gigs and opportunities.

The overall experience should feel like a combination of talent discovery, portfolio, jobs, gigs and hiring — not simply another freelance job board.
