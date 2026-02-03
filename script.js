/**
 * NBSC Anonymous Student Feedback System
 * Main JavaScript File
 */

// ═══════════════════════════════════════════════════════════════
// 1. PAGE NAVIGATION
// ═══════════════════════════════════════════════════════════════

const navLinks = document.querySelectorAll('[data-page]');
const pages = {
  home: 'page-home',
  about: 'page-about',
  howitworks: 'page-howitworks',
  feedback: 'page-feedback',
  previous: 'page-previous',
  complaints: 'page-complaints',
  contact: 'page-contact'
};

/**
 * Navigate to a specific page
 * @param {string} pageKey - The page key to navigate to
 */
function navigate(pageKey) {
  Object.values(pages).forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  navLinks.forEach(a => a.classList.remove('active'));

  const target = document.getElementById(pages[pageKey]);
  if (target) {
    target.classList.add('active');
    navLinks.forEach(a => {
      if (a.dataset.page === pageKey) {
        a.classList.add('active');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Navigation event listeners
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigate(link.dataset.page);
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Mobile hamburger menu toggle
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});


// ═══════════════════════════════════════════════════════════════
// 2. FEEDBACK RENDERING
// ═══════════════════════════════════════════════════════════════

const sampleFeedback = [
  {
    category: 'Academics',
    rating: 4,
    tags: ['Suggestion'],
    date: 'Jan 29, 2026',
    message: 'The new science lab equipment has been a huge upgrade. Would love to see more simulation software added to complement the hardware.'
  },
  {
    category: 'Facilities',
    rating: 2,
    tags: ['Complaint', 'Urgent'],
    date: 'Jan 27, 2026',
    message: 'The lighting in Building C classrooms flickers often and makes it hard to focus during exams. Needs urgent attention.'
  },
  {
    category: 'Campus Life',
    rating: 5,
    tags: ['Compliment'],
    date: 'Jan 25, 2026',
    message: 'The intramural events this semester were exceptionally well-organized. Great job to the student council and administration!'
  },
  {
    category: 'Services',
    rating: 3,
    tags: ['Suggestion'],
    date: 'Jan 22, 2026',
    message: 'The library Wi-Fi is inconsistent during peak hours. Upgrading routers or adding more access points would help a lot.'
  },
  {
    category: 'Faculty',
    rating: 4,
    tags: ['Compliment', 'Follow-up'],
    date: 'Jan 20, 2026',
    message: 'Professor Santos goes above and beyond during office hours. More professors following that example would significantly improve learning.'
  },
  {
    category: 'Administration',
    rating: 3,
    tags: ['Suggestion'],
    date: 'Jan 18, 2026',
    message: 'Online enrollment could be smoother — fewer redirects and a progress indicator would make the whole process less stressful.'
  }
];

/**
 * Render feedback list to the DOM
 * @param {array} list - Array of feedback objects
 */
function renderFeedback(list) {
  document.getElementById('feedbackList').innerHTML = list
    .map(
      f => `
    <div class="feedback-card">
      <div class="feedback-card__header">
        <span class="feedback-card__cat">${f.category}</span>
        <span class="feedback-card__date">${f.date}</span>
      </div>
      <div class="feedback-card__stars">${'★'.repeat(f.rating)}${
        '☆'.repeat(5 - f.rating)
      }</div>
      <p>${f.message}</p>
      <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">
        ${f.tags
          .map(
            t => `<span style="font-size:11px;background:var(--teal-dim);color:var(--teal);padding:2px 10px;border-radius:14px;font-weight:600;">${t}</span>`
          )
          .join('')}
      </div>
    </div>`
    )
    .join('');
}

renderFeedback(sampleFeedback);


// ═══════════════════════════════════════════════════════════════
// 3. NOTIFICATION TOAST
// ═══════════════════════════════════════════════════════════════

/**
 * Show toast notification
 * @param {string} title - Toast title
 * @param {string} msg - Toast message
 */
function showToast(title, msg) {
  document.getElementById('toastTitle').textContent = title || 'Done!';
  document.getElementById('toastMsg').textContent = msg || '';
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3600);
}


// ═══════════════════════════════════════════════════════════════
// 4. VISIBILITY TOGGLE
// ═══════════════════════════════════════════════════════════════

document.querySelectorAll('input[name="visibility"]').forEach(r => {
  r.addEventListener('change', () => {
    document.getElementById('visHelp').innerHTML =
      r.value === 'public'
        ? '<strong>Public</strong> — visible to all students (instructor name is hidden).'
        : '<strong>Private</strong> — only you and the authorized NBSC reviewer can see this.';
  });
});

// ═══════════════════════════════════════════════════════════════
// 5. ROLE SELECTION
// ═══════════════════════════════════════════════════════════════

/**
 * Select a role pill
 * @param {element} el - The role pill element
 */
function selectRole(el) {
  document.querySelectorAll('.role-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
}


// ═══════════════════════════════════════════════════════════════
// 6. FILE UPLOAD & EVIDENCE MANAGEMENT
// ═══════════════════════════════════════════════════════════════

let attachedFiles = [];

/**
 * Get icon emoji for file type
 * @param {string} type - MIME type
 * @returns {string} emoji icon
 */
function fileIcon(type) {
  if (type.startsWith('image/')) return '🖼️';
  if (type.startsWith('audio/')) return '🎵';
  if (type.startsWith('video/')) return '🎥';
  return '📄';
}

/**
 * Render file preview chips
 */
function renderPreviews() {
  document.getElementById('uploadPreviews').innerHTML = attachedFiles
    .map(
      (f, i) => `
    <div class="upload-preview">
      <span class="upload-preview__icon">${fileIcon(f.type)}</span>
      <span class="upload-preview__name" title="${f.name}">${f.name}</span>
      <button class="upload-preview__rm" onclick="removeFile(${i})">×</button>
    </div>`
    )
    .join('');
}

/**
 * Add files to attachedFiles array
 * @param {FileList} fl - File list
 */
function addFiles(fl) {
  [...fl].forEach(f => {
    if (f.size > 50 * 1024 * 1024 || !f.type.match(/^(image|audio|video)\//)) return;
    attachedFiles.push(f);
  });
  renderPreviews();
}

/**
 * Remove file from attachedFiles
 * @param {number} i - File index
 */
function removeFile(i) {
  attachedFiles.splice(i, 1);
  renderPreviews();
}

// File input change event
document.getElementById('evidenceInput').addEventListener('change', function () {
  addFiles(this.files);
  this.value = '';
});

// Upload zone drag & drop
const uz = document.getElementById('uploadZone');
uz.addEventListener('dragover', e => {
  e.preventDefault();
  uz.classList.add('dragover');
});
uz.addEventListener('dragleave', e => {
  e.preventDefault();
  uz.classList.remove('dragover');
});
uz.addEventListener('drop', e => {
  e.preventDefault();
  uz.classList.remove('dragover');
  addFiles(e.dataTransfer.files);
});


// ═══════════════════════════════════════════════════════════════
// 7. COMPLAINTS RENDERING
// ═══════════════════════════════════════════════════════════════

const complaintsData = [
  {
    role: 'Instructor',
    visibility: 'public',
    rating: 2,
    category: 'Faculty',
    date: 'Jan 30, 2026',
    message: 'Unfair grading policy applied without prior notice. Students were not informed of the change before the exam.',
    evidence: [
      { name: 'exam_paper.jpg', type: 'image/jpeg' },
      { name: 'notification_screenshot.png', type: 'image/png' }
    ],
    encrypted: true
  },
  {
    role: 'Authorized Personnel',
    visibility: 'public',
    rating: 3,
    category: 'Administration',
    date: 'Jan 28, 2026',
    message: 'Delayed processing of scholarship applications with no clear communication to affected students.',
    evidence: [{ name: 'application_receipt.jpg', type: 'image/jpeg' }],
    encrypted: true
  },
  {
    role: 'Instructor',
    visibility: 'private',
    rating: 1,
    category: 'Faculty',
    date: 'Jan 24, 2026',
    message: 'Class attendance records were inaccurate. Several students were marked absent despite being present.',
    evidence: [{ name: 'attendance_audio.mp3', type: 'audio/mpeg' }],
    encrypted: true
  },
  {
    role: 'Authorized Personnel',
    visibility: 'public',
    rating: 4,
    category: 'Services',
    date: 'Jan 21, 2026',
    message: 'Maintenance requests submitted through the portal were ignored for over two weeks.',
    evidence: [
      { name: 'request_ticket.png', type: 'image/png' },
      { name: 'followup_video.mp4', type: 'video/mp4' }
    ],
    encrypted: true
  }
];

/**
 * Render complaints list to the DOM
 */
function renderComplaints() {
  document.getElementById('complaintsList').innerHTML = complaintsData
    .map(
      c => `
    <div class="complaint-card">
      <div class="complaint-card__top">
        <div class="complaint-card__badges">
          <span class="badge badge--${c.role === 'Instructor' ? 'instructor' : 'admin'}">
            ${c.role === 'Instructor' ? '👨‍🏫' : '🛡️'} ${c.role}
          </span>
          <span class="badge badge--verified">✓ Verified</span>
          <span class="badge badge--${c.visibility === 'public' ? 'public' : 'private'}">
            ${c.visibility === 'public' ? '🌐 Public' : '🔒 Private'}
          </span>
          ${c.encrypted ? '<span class="badge badge--encrypted">🔐 Encrypted</span>' : ''}
        </div>
        <span class="complaint-card__date">${c.date}</span>
      </div>
      <div class="complaint-card__stars">${'★'.repeat(c.rating)}${
        '☆'.repeat(5 - c.rating)
      }</div>
      <p>${c.message}</p>
      ${
        c.evidence && c.evidence.length
          ? `<div class="evidence-chips">${c.evidence
              .map(
                ev => `<span class="evidence-chip">${fileIcon(ev.type)} ${ev.name}</span>`
              )
              .join('')}</div>`
          : ''
      }
      <div style="margin-top:14px;">
        <button class="pdf-panel__btn" style="font-size:12px;padding:7px 16px;" onclick="openVerifyModal()">
          🔐 Download Encrypted PDF
        </button>
      </div>
    </div>`
    )
    .join('');
}

renderComplaints();


// ═══════════════════════════════════════════════════════════════
// 8. FORM SUBMISSION
// ═══════════════════════════════════════════════════════════════

document.getElementById('feedbackForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const category = document.getElementById('fCategory').value;
  const rating = document.querySelector('input[name="rating"]:checked')?.value;
  const message = document.getElementById('fMessage').value.trim();
  const tags = [...document.querySelectorAll('.check-group input:checked')].map(i => i.value);

  if (!category || !rating || message.length < 20) return;

  const visibility = document.querySelector('input[name="visibility"]:checked')?.value || 'public';
  const roleEl = document.querySelector('.role-pill.selected');
  const role = roleEl ? roleEl.dataset.role : 'General';
  const evidence = attachedFiles.map(f => ({ name: f.name, type: f.type }));
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Add to feedback list
  sampleFeedback.unshift({
    category,
    rating: Number(rating),
    tags: tags.length ? tags : ['General'],
    date: dateStr,
    message
  });
  renderFeedback(sampleFeedback);

  // Add to complaints if targeting personnel
  if (role === 'Instructor' || role === 'Authorized Personnel') {
    complaintsData.unshift({
      role,
      visibility,
      rating: Number(rating),
      category,
      date: dateStr,
      message,
      evidence,
      encrypted: true
    });
    renderComplaints();
  }

  showToast('Feedback Submitted!', 'Your response has been recorded anonymously.');
  this.reset();
  attachedFiles = [];
  renderPreviews();
  document.querySelectorAll('.role-pill').forEach(p => p.classList.remove('selected'));
});


// ═══════════════════════════════════════════════════════════════
// 9. IDENTITY VERIFICATION MODAL
// ═══════════════════════════════════════════════════════════════

let verifyStep = 0;
const stepIds = ['vstep1', 'vstep2', 'vstep3'];
const btnTexts = [
  'I am a member of NBSC →',
  'I am the named person →',
  'Download Encrypted PDF 📥'
];

/**
 * Open verification modal
 */
function openVerifyModal() {
  verifyStep = 0;
  stepIds.forEach(id => document.getElementById(id).classList.remove('done'));
  document.getElementById('verifyNextBtn').textContent = btnTexts[0];
  document.getElementById('verifyNextBtn').disabled = false;
  document.getElementById('verifyOverlay').classList.add('open');
}

/**
 * Close verification modal
 */
function closeVerifyModal() {
  document.getElementById('verifyOverlay').classList.remove('open');
}

/**
 * Proceed to next verification step
 */
function verifyNext() {
  document.getElementById(stepIds[verifyStep]).classList.add('done');
  verifyStep++;

  if (verifyStep < btnTexts.length) {
    document.getElementById('verifyNextBtn').textContent = btnTexts[verifyStep];
  } else {
    document.getElementById('verifyNextBtn').textContent = '⏳ Downloading…';
    document.getElementById('verifyNextBtn').disabled = true;
    setTimeout(() => {
      closeVerifyModal();
      showToast('PDF Downloaded!', 'The encrypted complaint report has been saved.');
    }, 1800);
  }
}

// Close modal on overlay click
document.getElementById('verifyOverlay').addEventListener('click', function (e) {
  if (e.target === this) {
    closeVerifyModal();
  }
});
