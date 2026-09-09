# Micro Skill Marketplace App — Professional App Development Specification (Updated)

## 1. Project Overview
The Micro Skill Marketplace App is a global platform designed to connect verified freelancers with verified clients for fast, affordable micro-services such as video editing, thumbnail design, caption writing, and content repurposing. The platform prioritizes trust, escrow protection, fast delivery, quality verification, and sustainable monetization.

## 2. Core Features
- User Registration (Client & Freelancer)
- Profile Creation with Portfolio Upload
- Service / Gig Posting
- Job Posting by Clients
- Escrow Payment System
- In-App Messaging
- Ratings & Reviews
- Dispute Resolution System
- Verification Badge System

## 3. Page-by-Page App Structure

**Splash Screen**
- Displays app logo
- Loading animation
- Tagline / brand identity

**Onboarding Screens**
- Introduction to platform benefits
- Explanation of how the marketplace works
- Key value propositions (trust, escrow, fast delivery)

**Sign Up / Registration**
- Email registration
- Phone number verification
- Role selection (Client or Freelancer)

**Login Screen**
- Email / phone login
- Password authentication
- Forgot password recovery

**Home Page**
- Browse available services / gigs
- Search functionality
- Featured freelancers / gigs

**Freelancer Profile Page**
- Freelancer bio & details
- Portfolio gallery
- Ratings & reviews
- Verification badge
- Completed job history

**Gig Creation Page (Freelancers)**
- Service description
- Pricing setup
- Delivery time selection
- Portfolio upload

**Post a Job Page (Clients)**
- Job description
- Budget input
- Deadline selection
- Category selection
- Escrow deposit requirement

**Messaging Page**
- Real-time chat system
- File sharing capability
- Communication between client & freelancer

**Checkout Page**
- Secure payment processing
- Escrow fund holding
- Order confirmation

**Order Tracking Page**
- Delivery timeline
- Status updates
- Revision requests

**Review & Rating Page**
- Mutual ratings
- Feedback system
- Reputation building

**Dispute Resolution Page**
- Evidence submission
- Admin review process
- Fund protection mechanism

## 4. Payment & Escrow System
All payments must be processed via Stripe integration. Funds are securely held in escrow until the client approves the completed work. In the event of disputes, funds remain frozen pending administrative resolution.

## 5. Verification & Trust System
- Email & Phone Verification for all users
- Optional ID Verification for Freelancers
- Portfolio Review prior to approval
- Verified Badge for approved professionals
- Client deposit required before job posting

## 6. Admin Dashboard Requirements
- User Management System
- Freelancer Approval Workflow
- Dispute Handling Panel
- Transaction Monitoring
- Revenue Analytics
- Content Moderation Tools

## 7. Revenue Model
**Primary Revenue Streams:**
- Commission: 10–20% per completed transaction
- Premium Subscription for Freelancers
- Featured Gig Promotion
- Rewarded Advertising (Google AdMob)

## 8. Premium Subscription Strategy

**Premium Freelancer Plan**
- Monthly Plan: $5 per month
- Quarterly Plan: $12.99 / 3 months

**Premium Benefits:**
- Unlimited job applications
- No advertisements
- Higher ranking priority
- Gig visibility boosts
- Premium badge / status
- Increased earning opportunities

## 9. Advertising & AdMob Monetization Strategy
The platform integrates Google AdMob using Rewarded Advertisements. Ads are implemented as optional value exchanges rather than intrusive interruptions.

**Rewarded Ad Use Cases:**
- Watch Ad → Unlock additional job applications
- Watch Ad → Boost gig visibility
- Watch Ad → Temporary profile promotion

**Ad Experience Principles:**
- Ads must never interrupt chats or payments
- Ads must provide clear user benefits
- Ads must enhance earning potential

## 10. Hybrid Monetization Philosophy
The platform adopts a hybrid monetization model ensuring consistent revenue generation:
- Premium Users → Subscription Revenue
- Free Users → Advertising Revenue
- All Transactions → Commission Revenue
