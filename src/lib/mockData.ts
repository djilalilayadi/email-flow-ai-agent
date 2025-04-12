
import { EmailType } from "./types";

export const mockEmails: EmailType[] = [
  {
    id: "1",
    sender: {
      name: "Sarah Johnson",
      email: "sarah@designstudio.com"
    },
    subject: "Website Redesign Project Proposal",
    content: `Hi there,

I hope this email finds you well. I've been looking at your portfolio and I think you'd be perfect for our website redesign project.

We're a mid-sized marketing agency looking to refresh our digital presence. Our current website is about 4 years old and doesn't reflect our current brand direction or showcase our recent work effectively.

Key requirements:
- Modern, responsive design
- Portfolio showcase section
- Blog integration
- Contact form with filtering capabilities
- Team member profiles

Our budget is in the $5,000-$7,500 range, and we're hoping to complete the project within the next two months.

Could you let me know your availability and if this project would be of interest? If so, I'd love to schedule a call to discuss details.

Best regards,
Sarah Johnson
Creative Director | Design Studio`,
    timestamp: "2023-04-11T09:30:00Z",
    read: false,
    important: true,
    summary: "Design Studio is seeking a freelancer for a website redesign project with a $5,000-$7,500 budget to be completed within two months. They need a modern, responsive design with portfolio showcase, blog, contact form, and team profiles.",
    labels: ["client", "project"],
    attachments: [
      {
        id: "a1",
        filename: "project_brief.pdf",
        size: "2.4 MB"
      },
      {
        id: "a2",
        filename: "brand_guidelines.pdf",
        size: "5.7 MB"
      }
    ]
  },
  {
    id: "2",
    sender: {
      name: "Accounting Dept",
      email: "accounting@techinnovate.com"
    },
    subject: "Invoice #1082 Payment Received",
    content: `Dear Freelancer,

This is a confirmation that we have received your payment for Invoice #1082 in the amount of $2,450.00.

Payment details:
- Invoice Number: #1082
- Project: Mobile App UI Design
- Amount: $2,450.00
- Payment Method: Bank Transfer
- Date Received: April 10, 2023

Thank you for your prompt payment. We have issued a receipt which is attached to this email for your records.

If you have any questions regarding this payment or need further assistance, please don't hesitate to contact our accounting department.

Best regards,
Accounting Department
Tech Innovate Inc.`,
    timestamp: "2023-04-10T16:45:00Z",
    read: true,
    important: false,
    labels: ["invoice"],
    attachments: [
      {
        id: "a3",
        filename: "receipt_1082.pdf",
        size: "342 KB"
      }
    ]
  },
  {
    id: "3",
    sender: {
      name: "Michael Chen",
      email: "michael@startupvision.co"
    },
    subject: "Urgent: Changes to Homepage Design",
    content: `Hi there,

I hope you're doing well. I'm reaching out because we need to make some urgent changes to the homepage design we discussed last week.

Our CEO had a review meeting yesterday and has requested several modifications before we can launch next Monday:

1. The hero section needs to be more impactful - perhaps we can use a video background instead of the static image?
2. The call-to-action buttons need to be more prominent (he suggested changing from blue to orange)
3. We need to add a new section highlighting our recent press coverage (I can provide the logos and links)

I know this is short notice, but is there any way you can accommodate these changes by Thursday? We're happy to discuss rush fees if needed.

Let me know as soon as possible if this is feasible.

Thanks for understanding,
Michael Chen
Product Manager | StartupVision`,
    timestamp: "2023-04-10T11:20:00Z",
    read: false,
    important: true,
    summary: "Urgent request from StartupVision to modify the homepage design before Monday's launch. Changes include using a video background for the hero section, making CTA buttons more prominent (changing from blue to orange), and adding a section for press coverage. They need these changes by Thursday and are willing to pay rush fees.",
    labels: ["client", "urgent"]
  },
  {
    id: "4",
    sender: {
      name: "Marketing Conference",
      email: "events@marketingconference.com"
    },
    subject: "Speaker Opportunity: Digital Marketing Summit",
    content: `Dear Creative Professional,

We're excited to invite you to speak at the upcoming Digital Marketing Summit, taking place on June 15-16, 2023, at the Grand Convention Center.

Based on your expertise and contribution to the field, we believe you would be an excellent speaker for our "Freelancing in the Digital Age" panel. This session aims to provide insights for marketing professionals looking to build independent careers.

The panel will be 45 minutes long, followed by a 15-minute Q&A session. As a speaker, you will receive:
- Full conference pass ($599 value)
- Speaker honorarium of $350
- Professional video recording of your session
- Networking dinner with other speakers and sponsors

Please let us know if you're interested and available by April 20th. We can then share more details about the panel format and other speakers.

Best regards,
Events Team
Digital Marketing Summit`,
    timestamp: "2023-04-09T14:15:00Z",
    read: true,
    important: false,
    labels: []
  },
  {
    id: "5",
    sender: {
      name: "David Wilson",
      email: "david@techjobs.io"
    },
    subject: "Contract Opportunity: UX/UI Designer (6 months)",
    content: `Hello,

I'm reaching out from TechJobs.io regarding an exciting contract opportunity that matches your skill set.

Our client, a rapidly growing fintech company, is looking for a UX/UI Designer for a 6-month contract, with possibility of extension or conversion to full-time.

Position details:
- Remote work with occasional meetings in Seattle (once a month)
- Rate: $75-90/hour, depending on experience
- Project focus: Redesigning their consumer-facing investment platform
- Start date: May 1, 2023

Key requirements:
- 3+ years of UX/UI design experience
- Financial services interface design experience is a plus
- Proficiency with Figma and design systems
- Experience conducting user research and usability testing

If you're interested, please reply with your updated portfolio and availability for a screening call this week.

Best regards,
David Wilson
Senior Recruiter | TechJobs.io`,
    timestamp: "2023-04-08T10:05:00Z",
    read: false,
    important: false,
    summary: "TechJobs.io is recruiting for a 6-month UX/UI Designer contract with a fintech company. The position offers $75-90/hour for remote work with monthly meetings in Seattle, starting May 1st. They're seeking someone with 3+ years of experience, Figma proficiency, and research skills. Financial interface design experience is a plus.",
    labels: ["client"]
  },
  {
    id: "6",
    sender: {
      name: "Elena Rodriguez",
      email: "elena@webagency.com"
    },
    subject: "Follow-up: Collaboration Opportunity",
    content: `Hi there,

I wanted to follow up on our conversation last week about potentially collaborating on client projects.

As I mentioned, our agency has been receiving more UI/UX design requests than our in-house team can handle, and we're looking to partner with reliable freelancers for overflow work.

After reviewing your portfolio more thoroughly, I believe your minimalist design aesthetic would be perfect for several of our upcoming projects in the SaaS space.

Would you be available for a quick 30-minute call next Tuesday or Wednesday to discuss this further? I'd like to go over our workflow, rates, and potential project timelines.

Looking forward to your response,
Elena Rodriguez
Creative Director | Web Agency Plus`,
    timestamp: "2023-04-07T15:30:00Z",
    read: true,
    important: false,
    labels: ["client", "meeting"]
  },
  {
    id: "7",
    sender: {
      name: "James Peterson",
      email: "james@designtools.com"
    },
    subject: "Your Design Tools Pro subscription is expiring soon",
    content: `Hello Designer,

This is a friendly reminder that your Design Tools Pro annual subscription will expire in 7 days on April 14, 2023.

Current Subscription:
- Plan: Professional Annual
- Price: $199/year
- Expiration: April 14, 2023

To ensure uninterrupted access to all Pro features, please renew your subscription before the expiration date. As a valued customer, we're offering you a 15% discount on renewal with the code RENEW15.

If you choose not to renew, your account will be downgraded to the Basic plan, which has limited features and export capabilities.

Renew now: [Renew Subscription]
Change plan: [Manage Subscription]

Thank you for being a Design Tools Pro user!

Best regards,
James Peterson
Customer Success | Design Tools`,
    timestamp: "2023-04-07T09:00:00Z",
    read: true,
    important: false,
    labels: []
  },
  {
    id: "8",
    sender: {
      name: "Project Management Conference",
      email: "info@pmconference.org"
    },
    subject: "Early Bird Tickets Now Available - Project Management for Creatives",
    content: `Dear Creative Professional,

We're excited to announce that Early Bird tickets are now available for the "Project Management for Creatives" conference, taking place September 5-6, 2023 in Chicago.

This year's conference focuses specifically on project management challenges and solutions for creative freelancers and agencies. Topics include:

• Client management strategies that preserve creative freedom
• Pricing models for creative projects
• Efficient workflows for solo practitioners
• Tools and software demonstrations
• Legal considerations for creative projects

Early Bird pricing (until May 31):
• Full Conference Pass: $399 (Regular: $599)
• Single Day Pass: $249 (Regular: $349)
• Workshop Add-on: $199 (Regular: $299)

With over 25 speakers from leading creative agencies and successful freelance businesses, this is an event you won't want to miss.

Register now: [Register Here]

We hope to see you there!

Best regards,
PM Conference Team`,
    timestamp: "2023-04-06T11:20:00Z",
    read: true,
    important: false,
    labels: []
  },
  {
    id: "9",
    sender: {
      name: "Thomas Wright",
      email: "thomas@innovateapp.com"
    },
    subject: "Meeting Recap and Next Steps",
    content: `Hi there,

Thank you for taking the time to meet with our team yesterday to discuss the app redesign project. I think we made great progress in defining the scope and direction.

Here's a summary of what we discussed and the next steps:

Key decisions:
1. We'll focus on redesigning the core user journey first (search, browse, purchase)
2. The account management and settings sections will be tackled in phase two
3. We'll maintain the current brand colors but refresh the UI components for better usability

Next steps from your end:
- Provide a detailed quote for phase one by April 15
- Share 2-3 concept directions for the main search interface by April 20
- Schedule a workshop with our product team to define the component library

Next steps from our end:
- Share the current user research and pain points by tomorrow
- Provide access to our analytics dashboard by Friday
- Schedule user testing resources for the concepts

I've attached the meeting recording and the whiteboard export for your reference.

Let me know if you have any questions or if I've missed anything!

Best,
Thomas Wright
Product Manager | Innovate App`,
    timestamp: "2023-04-05T16:40:00Z",
    read: true,
    important: true,
    summary: "Recap of a meeting about an app redesign project. Phase one will focus on redesigning the core user journey (search, browse, purchase) while maintaining brand colors but refreshing UI components. You need to provide a quote by April 15, share concept directions by April 20, and schedule a workshop. The client will share research, analytics access, and schedule user testing resources.",
    labels: ["client", "meeting", "project"],
    attachments: [
      {
        id: "a4",
        filename: "meeting_recording.mp4",
        size: "87.2 MB"
      },
      {
        id: "a5",
        filename: "whiteboard_export.pdf",
        size: "2.1 MB"
      }
    ]
  },
  {
    id: "10",
    sender: {
      name: "Sophia Lee",
      email: "sophia@artdirection.design"
    },
    subject: "Potential Collaboration on E-commerce Project",
    content: `Hello,

I hope this email finds you well. My name is Sophia Lee, and I'm an art director working on a new e-commerce project for a luxury skincare brand.

I came across your portfolio through the Webby Awards showcase and was particularly impressed with your work on the ReNew Beauty website. The way you combined elegant typography with interactive product showcases is exactly the approach we're looking for.

We're in need of a UI designer to help create a unique online shopping experience for our client. The project timeline would be approximately 8 weeks, starting in May.

Would you be interested in discussing this opportunity further? If so, I'd love to schedule a call to share more details about the project scope and see if it might be a good fit for your skills and availability.

Looking forward to your response,
Sophia Lee
Art Director | Creative Vision Studio`,
    timestamp: "2023-04-04T13:25:00Z",
    read: false,
    important: true,
    summary: "Sophia Lee, an art director, is looking for a UI designer for an 8-week luxury skincare e-commerce project starting in May. She was impressed by your ReNew Beauty website work in the Webby Awards showcase and wants to discuss the opportunity to create a unique online shopping experience.",
    labels: ["client", "project"]
  }
];

// Add more mock emails here
