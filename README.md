# NBSC Anonymous Student Feedback System

A modern, secure web application that allows students at National Bukidnon State College to submit anonymous feedback, complaints, and suggestions. The system ensures complete anonymity while allowing administrators to track and address student concerns effectively.

## Features

- **100% Anonymous**: No personal information is stored or linked to feedback submissions
- **Multiple Feedback Categories**: Academics, Facilities, Services, Campus Life, Faculty, and Administration
- **Star Rating System**: 5-star rating system for experience feedback
- **Role-Based Feedback**: Target feedback to specific Instructors, Authorized Personnel, or General/School concerns
- **File Evidence Upload**: Attach images, audio, and video files (up to 50MB each) as evidence
- **Visibility Control**: Choose between public or private feedback submissions
- **Complaint Encryption**: Encrypted PDF reports for complaints targeting specific personnel
- **Identity Verification**: 3-step verification process for accessing encrypted complaint PDFs
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Rendering**: Instant feedback and complaint list updates

## Project Structure

```
Anonymous Feedback/Website.1/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## File Descriptions

### index.html
Contains the complete HTML structure for all pages:
- **Navbar**: Navigation with hamburger menu for mobile
- **Home Page**: Hero section with key statistics
- **About Page**: Information about the feedback system
- **How It Works**: 5-step process explanation
- **Submit Feedback Page**: Comprehensive feedback form with all features
- **Previous Feedback Page**: Display of recent submissions
- **Complaints Page**: Encrypted complaint reports and verification modal
- **Contact Page**: Contact information for support
- **Footer**: Copyright and branding

### styles.css
Organized CSS with sections:
- **CSS Variables**: Color scheme and design tokens (Navy, Teal, Cream colors)
- **Navbar Styles**: Navigation bar and responsive hamburger menu
- **Page Navigation**: Animation and visibility for page transitions
- **Hero Section**: Banner with gradient background and call-to-action
- **Card Components**: About cards, feedback cards, complaint cards
- **Form Elements**: Inputs, textareas, selects with focus states
- **Star Rating**: Interactive star rating component
- **Checkboxes**: Custom checkbox styling
- **Upload Zone**: Drag-and-drop file upload area
- **Modal**: Verification modal with overlay
- **Badges**: Category and status badges
- **Responsive**: Mobile-first media queries

### script.js
Organized JavaScript in 9 sections:

1. **Page Navigation** (Lines 1-50)
   - Navigation logic and event listeners
   - Hamburger menu toggle for mobile

2. **Feedback Rendering** (Lines 51-120)
   - Sample feedback data array
   - `renderFeedback(list)` function to display feedback cards

3. **Notification Toast** (Lines 121-140)
   - `showToast(title, msg)` function for notifications

4. **Visibility Toggle** (Lines 141-160)
   - Dynamic help text for public/private feedback

5. **Role Selection** (Lines 161-175)
   - `selectRole(el)` function for role pill selection

6. **File Upload & Evidence** (Lines 176-250)
   - `fileIcon(type)` - Get emoji for file types
   - `renderPreviews()` - Display uploaded files
   - `addFiles(fl)` - Add files to array
   - `removeFile(i)` - Remove file from array
   - Drag-and-drop event listeners

7. **Complaints Rendering** (Lines 251-340)
   - Sample complaints data array
   - `renderComplaints()` function to display complaint cards

8. **Form Submission** (Lines 341-395)
   - Form validation and submission
   - Data collection from form fields
   - Dynamic rendering based on role selection

9. **Identity Verification Modal** (Lines 396-445)
   - `openVerifyModal()` - Open verification modal
   - `closeVerifyModal()` - Close modal
   - `verifyNext()` - Progress through verification steps

## How to Use

### For Students

1. **Navigate to Submit Feedback page**
   - Click "Submit Feedback" in the navbar or hero section CTA

2. **Fill out the form:**
   - Select a category (Academics, Facilities, Services, etc.)
   - Rate your experience (1-5 stars)
   - Write detailed feedback (minimum 20 characters)
   - Add tags (Optional: Urgent, Suggestion, Complaint, Compliment, Follow-up)

3. **Set Visibility:**
   - **Public**: Visible to all students, instructor name hidden
   - **Private**: Only you and authorized reviewers can see

4. **Select who the feedback is about:**
   - **Instructor**: About a specific faculty member
   - **Authorized Personnel**: About admin/staff
   - **General/School**: Not about a specific person

5. **Attach Evidence (Optional):**
   - Upload images, audio, or video (up to 50MB each)
   - Drag-and-drop or click to browse
   - Remove files by clicking the × button

6. **Submit**
   - Click "Submit Feedback →" button
   - Receive confirmation toast notification
   - Your feedback is recorded anonymously

### For Authorized Users (PDF Download)

1. Navigate to the **Complaints** page
2. Click **"🔐 Download Encrypted PDF"** button
3. Complete 3-step verification:
   - Confirm NBSC membership
   - Verify you are the named person
   - Download encrypted report
4. After verification, the encrypted PDF becomes available

## Color Scheme

| Color | Hex Value | Usage |
|-------|-----------|-------|
| Navy | `#0f1b2d` | Primary background, text |
| Navy Mid | `#1a2d45` | Hover states |
| Navy Light | `#243d5c` | Lighter navy variant |
| Teal | `#2ec4b6` | Accent, CTAs, highlights |
| Teal Light | `#40d9ca` | Teal hover state |
| Cream | `#f4f7f6` | Light background |
| White | `#ffffff` | Card backgrounds |

## Data Structure

### Feedback Object
```javascript
{
  category: 'Academics',        // Category of feedback
  rating: 4,                    // 1-5 star rating
  tags: ['Suggestion'],         // Array of tags
  date: 'Jan 29, 2026',        // Submission date
  message: 'Feedback text...'   // Feedback content
}
```

### Complaint Object
```javascript
{
  role: 'Instructor',           // 'Instructor' or 'Authorized Personnel'
  visibility: 'public',         // 'public' or 'private'
  rating: 2,                    // 1-5 star rating
  category: 'Faculty',          // Category of complaint
  date: 'Jan 30, 2026',        // Submission date
  message: 'Complaint text...', // Complaint content
  evidence: [                   // Array of files
    { name: 'file.jpg', type: 'image/jpeg' }
  ],
  encrypted: true               // Always true for complaints
}
```

## Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Key Functions Reference

| Function | Purpose | Parameters |
|----------|---------|-----------|
| `navigate(pageKey)` | Switch between pages | pageKey: page identifier |
| `renderFeedback(list)` | Display feedback list | list: feedback array |
| `renderComplaints()` | Display complaints list | none |
| `showToast(title, msg)` | Show notification | title, msg: strings |
| `selectRole(el)` | Select role pill | el: DOM element |
| `fileIcon(type)` | Get file emoji | type: MIME type |
| `addFiles(fl)` | Add files to upload | fl: FileList |
| `removeFile(i)` | Remove file | i: file index |
| `openVerifyModal()` | Open verification modal | none |
| `closeVerifyModal()` | Close modal | none |
| `verifyNext()` | Next verification step | none |

## Installation & Setup

1. Clone or download the project files
2. Ensure all three files are in the same directory:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Open `index.html` in a web browser
4. No build process or dependencies required

## Development Notes

- **Mobile Responsive**: Breakpoint at 680px for tablet/mobile layout
- **Smooth Animations**: 0.3s cubic-bezier transitions
- **Accessibility**: Semantic HTML, proper ARIA labels
- **Performance**: Lightweight CSS and vanilla JavaScript
- **No Dependencies**: Pure HTML, CSS, and JavaScript

## Future Enhancements

- Backend integration for persistent storage
- Email notifications for administrators
- Advanced search and filtering
- Data export and analytics dashboard
- Multi-language support
- User authentication system

## Support

For questions or issues with the feedback system, contact:
- **Email**: feedback@nbsc.edu.ph or support@nbsc.edu.ph
- **Location**: National Bukidnon State College, Malaybalay City, Bukidnon
- **Office Hours**: Mon – Fri, 8:00 AM – 5:00 PM

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Institution**: National Bukidnon State College (NBSC)
