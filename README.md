rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // DENY ALL BY DEFAULT
    match /{document=**} {
      allow read, write: if false;
    }

    // AUTH HELPERS
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isSignedIn() && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    function isEditor() {
      return isSignedIn() && exists(/databases/$(database)/documents/editors/$(request.auth.uid));
    }

    // SUBMISSIONS
    match /submissions/{submissionId} {
      allow create: if true;
      allow read, update, delete: if isAdmin() || isEditor();
    }

    // PROJECTS / ORDERS
    match /projects/{projectId} {
      allow read: if isAdmin() || isEditor();
      allow write: if isAdmin() || (isEditor() && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['status', 'finalFileUrl', 'updatedAt']));
    }

    // VIDEOS
    match /videos/{videoId} {
      allow read: if true;
      allow write: if isAdmin() || isEditor();
    }

    // EDITORS
    match /editors/{editorId} {
      allow read: if isAdmin() || (isSignedIn() && request.auth.uid == editorId);
      allow write: if isAdmin();
    }

    // PRICING & SETTINGS
    match /pricing/{tierId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /settings/global {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // ADMINS
    match /admins/{adminId} {
      allow read: if isSignedIn() && request.auth.uid == adminId;
      allow write: if false; // Only manageable via console
    }
  }
}
