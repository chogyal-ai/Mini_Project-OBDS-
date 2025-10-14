       // Sample user data with authentication
        let users = [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123!',
                phone: '+1 (555) 123-4567',
                bloodType: 'A+',
                location: 'New York',
                cid: '123456789',
                profilePicture: 'https://placehold.co/80x80/ef4444/white?text=JD'
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'Password123!',
                phone: '+1 (555) 987-6543',
                bloodType: 'O-',
                location: 'Los Angeles',
                cid: '987654321',
                profilePicture: 'https://placehold.co/80x80/3b82f6/white?text=JS'
            }
        ];
        // Sample data for donations and requests
        let donors = [
            {
                id: 1,
                name: 'Sarah Johnson',
                bloodType: 'A+',
                location: 'Downtown Hospital',
                phone: '+1 (555) 123-4567',
                lastDonation: '2024-01-15',
                available: true,
                donations: 12,
                cid: '111222333'
            },
            {
                id: 2,
                name: 'Michael Chen',
                bloodType: 'O-',
                location: 'City Medical Center',
                phone: '+1 (555) 987-6543',
                lastDonation: '2024-02-01',
                available: true,
                donations: 8,
                cid: '444555666'
            },
            {
                id: 3,
                name: 'Emma Rodriguez',
                bloodType: 'B+',
                location: 'Westside Clinic',
                phone: '+1 (555) 456-7890',
                lastDonation: '2024-01-28',
                available: false,
                donations: 15,
                cid: '777888999'
            }
        ];
        let requests = [
            {
                id: 1,
                patientName: 'David Wilson',
                bloodType: 'AB+',
                location: 'Memorial Hospital',
                urgency: 'High',
                contact: '+1 (555) 234-5678',
                dateNeeded: '2024-03-15',
                status: 'Active',
                cid: '777888999'
            },
            {
                id: 2,
                patientName: 'Lisa Thompson',
                bloodType: 'O+',
                location: 'St. Mary\'s Hospital',
                urgency: 'Medium',
                contact: '+1 (555) 876-5432',
                dateNeeded: '2024-03-20',
                status: 'Active',
                cid: '000111222'
            },
            {
                id: 3,
                patientName: 'Robert Brown',
                bloodType: 'A-',
                location: 'Central Hospital',
                urgency: 'Low',
                contact: '+1 (555) 345-6789',
                dateNeeded: '2024-04-01',
                status: 'Active',
                cid: '333444555'
            }
        ];
        // Notifications array
        let notifications = [];
        // Connection requests (to track donor-requester connections)
        let connectionRequests = [];
        // State management
        let currentUser = null;
        let currentUserRole = null; // 'donor' or 'requester'
        let currentTab = 'dashboard';
        let resetEmail = '';
        let resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

        // DOM Elements
        const loginScreen = document.getElementById('loginScreen');
        const registerScreen = document.getElementById('registerScreen');
        const forgotPasswordScreen = document.getElementById('forgotPasswordScreen');
        const resetPasswordScreen = document.getElementById('resetPasswordScreen');
        const mainApp = document.getElementById('mainApp');
        const headerAvatar = document.getElementById('headerAvatar');
        const profileAvatar = document.getElementById('profileAvatar');
        const editProfileAvatar = document.getElementById('editProfileAvatar');
        const userDropdown = document.getElementById('userDropdown');
        const notificationsContainer = document.getElementById('notificationsContainer');
        const notificationsBtn = document.getElementById('notificationsBtn');
        const notificationsDropdown = document.getElementById('notificationsDropdown');
        const notificationBadge = document.getElementById('notificationBadge');
        const notificationsList = document.getElementById('notificationsList');
        // Role selection
        const roleSelection = document.getElementById('roleSelection');
        const donateRoleBtn = document.getElementById('donateRoleBtn');
        const requestRoleBtn = document.getElementById('requestRoleBtn');
        // Unified interface elements
        const unifiedInterface = document.getElementById('unifiedInterface');
        const dashboardContent = document.getElementById('dashboardContent');
        const bloodRequestsContent = document.getElementById('bloodRequestsContent');
        const availableDonorsContent = document.getElementById('availableDonorsContent');
        const dashboardCards = document.getElementById('dashboardCards');
        const bloodRequestsCards = document.getElementById('bloodRequestsCards');
        const availableDonorsCards = document.getElementById('availableDonorsCards');
        const dashboardActionButtons = document.getElementById('dashboardActionButtons');
        // Profile elements
        const profileContent = document.getElementById('profileContent');
        const editProfileContent = document.getElementById('editProfileContent');
        const backToUnifiedInterface = document.getElementById('backToUnifiedInterface');
        const backToProfileView = document.getElementById('backToProfileView');
        // Profile elements
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const profileType = document.getElementById('profileType');
        const profileFullName = document.getElementById('profileFullName');
        const profileEmailValue = document.getElementById('profileEmailValue');
        const profilePhone = document.getElementById('profilePhone');
        const profileBloodType = document.getElementById('profileBloodType');
        const profileLocation = document.getElementById('profileLocation');
        const profileCID = document.getElementById('profileCID');
        const editFullName = document.getElementById('editFullName');
        const editEmail = document.getElementById('editEmail');
        const editPhone = document.getElementById('editPhone');
        const editBloodType = document.getElementById('editBloodType');
        const editLocation = document.getElementById('editLocation');
        const editCID = document.getElementById('editCID');
        const profileForm = document.getElementById('profileForm');
        // Modal elements
        const addDonationModal = document.getElementById('addDonationModal');
        const addRequestModal = document.getElementById('addRequestModal');
        const connectModal = document.getElementById('connectModal');
        const donateModal = document.getElementById('donateModal');
        const deleteModal = document.getElementById('deleteModal');
        const feedbackModal = document.getElementById('feedbackModal');
        const aboutModal = document.getElementById('aboutModal');
        const closeDonationModal = document.getElementById('closeDonationModal');
        const closeRequestModal = document.getElementById('closeRequestModal');
        const closeConnectModal = document.getElementById('closeConnectModal');
        const closeDonateModal = document.getElementById('closeDonateModal');
        const closeDeleteModal = document.getElementById('closeDeleteModal');
        const closeFeedbackModal = document.getElementById('closeFeedbackModal');
        const closeAboutModal = document.getElementById('closeAboutModal');
        const cancelDonation = document.getElementById('cancelDonation');
        const cancelRequest = document.getElementById('cancelRequest');
        const donationForm = document.getElementById('donationForm');
        const requestForm = document.getElementById('requestForm');
        const feedbackForm = document.getElementById('feedbackForm');
        // Password validation elements
        const registerPassword = document.getElementById('registerPassword');
        const lengthReq = document.getElementById('length');
        const uppercaseReq = document.getElementById('uppercase');
        const lowercaseReq = document.getElementById('lowercase');
        const numberReq = document.getElementById('number');
        const specialReq = document.getElementById('special');

        // Initialize
        function init() {
            // Set today's date as default for date inputs
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('lastDonation').value = today;
            document.getElementById('dateNeeded').value = today;

            // Event listeners for auth screens
            document.getElementById('loginForm').addEventListener('submit', handleLogin);
            document.getElementById('registerForm').addEventListener('submit', handleRegister);
            document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
            document.getElementById('resetPasswordForm').addEventListener('submit', handleResetPassword);
            document.getElementById('showForgotPassword').addEventListener('click', (e) => {
                e.preventDefault();
                loginScreen.style.display = 'none';
                forgotPasswordScreen.style.display = 'flex';
            });
            document.getElementById('showRegister').addEventListener('click', () => {
                loginScreen.style.display = 'none';
                registerScreen.style.display = 'flex';
            });
            document.getElementById('backToLogin').addEventListener('click', () => {
                registerScreen.style.display = 'none';
                loginScreen.style.display = 'flex';
            });
            document.getElementById('backToLoginFromForgot').addEventListener('click', () => {
                forgotPasswordScreen.style.display = 'none';
                loginScreen.style.display = 'flex';
            });
            document.getElementById('backToLoginFromReset').addEventListener('click', () => {
                resetPasswordScreen.style.display = 'none';
                loginScreen.style.display = 'flex';
            });

            // Main app event listeners
            document.getElementById('logoutBtn').addEventListener('click', logout);
            document.getElementById('viewProfileBtn').addEventListener('click', () => {
                showProfileView();
                userDropdown.classList.remove('active');
            });
            document.getElementById('feedbackBtn').addEventListener('click', () => {
                feedbackModal.classList.add('active');
                userDropdown.classList.remove('active');
            });
            document.getElementById('aboutBtn').addEventListener('click', () => {
                aboutModal.classList.add('active');
                userDropdown.classList.remove('active');
            });

            // Role selection
            donateRoleBtn.addEventListener('click', () => {
                currentUserRole = 'donor';
                showUnifiedInterface();
            });
            requestRoleBtn.addEventListener('click', () => {
                currentUserRole = 'requester';
                showUnifiedInterface();
            });

            // Back to Role Selection button
            document.getElementById('backToRoleSelection').addEventListener('click', showRoleSelection);

            // Back buttons
            backToUnifiedInterface.addEventListener('click', () => {
                showUnifiedInterface();
            });
            backToProfileView.addEventListener('click', () => {
                showProfileView();
            });

            // Navigation tab click handlers
            document.querySelector('.nav-tab[data-tab="dashboard"]').addEventListener('click', () => switchTab('dashboard'));
            document.querySelector('.nav-tab[data-tab="bloodRequests"]').addEventListener('click', () => switchTab('bloodRequests'));
            document.querySelector('.nav-tab[data-tab="availableDonors"]').addEventListener('click', () => switchTab('availableDonors'));

            // Button click handlers
            document.getElementById('addDonationBtn2').addEventListener('click', openDonationModal);
            document.getElementById('addRequestBtn2').addEventListener('click', openRequestModal);
            editProfileBtn.addEventListener('click', () => showEditProfile());
            cancelEdit.addEventListener('click', () => showProfileView());

            // Avatar click handlers
            document.getElementById('headerAvatar').addEventListener('click', toggleUserDropdown);
            document.getElementById('avatarUploadBtn').addEventListener('click', () => {
                document.getElementById('avatarFileInput').click();
            });
            document.getElementById('editAvatarUploadBtn').addEventListener('click', () => {
                document.getElementById('editAvatarFileInput').click();
            });
            document.getElementById('avatarFileInput').addEventListener('change', handleAvatarUpload);
            document.getElementById('editAvatarFileInput').addEventListener('change', handleAvatarUpload);

            // Password validation
            registerPassword.addEventListener('input', validatePassword);

            // Notifications
            notificationsBtn.addEventListener('click', toggleNotifications);
            document.addEventListener('click', (e) => {
                if (!userDropdown.contains(e.target) && !headerAvatar.contains(e.target)) {
                    userDropdown.classList.remove('active');
                }
                if (!notificationsDropdown.contains(e.target) && !notificationsContainer.contains(e.target)) {
                    notificationsDropdown.classList.remove('active');
                }
            });

            // Modal event listeners
            closeDonationModal.addEventListener('click', closeDonationModalHandler);
            closeRequestModal.addEventListener('click', closeRequestModalHandler);
            closeConnectModal.addEventListener('click', closeConnectModalHandler);
            closeDonateModal.addEventListener('click', closeDonateModalHandler);
            closeDeleteModal.addEventListener('click', closeDeleteModalHandler);
            closeFeedbackModal.addEventListener('click', closeFeedbackModalHandler);
            closeAboutModal.addEventListener('click', closeAboutModalHandler);
            document.getElementById('cancelFeedback').addEventListener('click', closeFeedbackModalHandler);
            document.getElementById('closeAbout').addEventListener('click', closeAboutModalHandler);
            cancelDonation.addEventListener('click', closeDonationModalHandler);
            cancelRequest.addEventListener('click', closeRequestModalHandler);
            donationForm.addEventListener('submit', handleDonationSubmit);
            requestForm.addEventListener('submit', handleRequestSubmit);
            profileForm.addEventListener('submit', handleProfileUpdate);
            feedbackForm.addEventListener('submit', handleFeedbackSubmit);

            // Search and filter for blood requests
            document.getElementById('searchInput').addEventListener('input', updateBloodRequests);
            document.getElementById('bloodTypeFilter').addEventListener('change', updateBloodRequests);
            document.getElementById('locationFilter').addEventListener('input', updateBloodRequests);

            // Search and filter for available donors
            document.getElementById('donorSearchInput').addEventListener('input', updateAvailableDonors);
            document.getElementById('donorBloodTypeFilter').addEventListener('change', updateAvailableDonors);
            document.getElementById('donorLocationFilter').addEventListener('input', updateAvailableDonors);
        }

        // Password validation function
        function validatePassword() {
            const password = registerPassword.value;
            const requirements = {
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /\d/.test(password),
                special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
            };
            lengthReq.className = requirements.length ? 'valid' : 'invalid';
            uppercaseReq.className = requirements.uppercase ? 'valid' : 'invalid';
            lowercaseReq.className = requirements.lowercase ? 'valid' : 'invalid';
            numberReq.className = requirements.number ? 'valid' : 'invalid';
            specialReq.className = requirements.special ? 'valid' : 'invalid';
            return Object.values(requirements).every(req => req);
        }

        // Authentication functions
        function handleLogin(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                currentUser = user;
                loginScreen.style.display = 'none';
                mainApp.style.display = 'block';
                updateUI();
                showRoleSelection();
                updateNotifications();
            } else {
                alert('Invalid email or password!');
            }
        }

        function handleRegister(e) {
            e.preventDefault();
            if (!validatePassword()) {
                alert('Please meet all password requirements!');
                return;
            }
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            if (users.some(u => u.email === email)) {
                alert('Email already registered!');
                return;
            }
            const newUser = {
                id: users.length + 1,
                name: name,
                email: email,
                password: password,
                phone: '',
                bloodType: '',
                location: '',
                cid: '',
                profilePicture: `https://placehold.co/80x80/ef4444/white?text=${name.charAt(0)}`
            };
            users.push(newUser);
            alert('Registration successful! Please login.');
            registerScreen.style.display = 'none';
            loginScreen.style.display = 'flex';
        }

        function handleForgotPassword(e) {
            e.preventDefault();
            const email = document.getElementById('forgotEmail').value;
            const user = users.find(u => u.email === email);
            if (user) {
                resetEmail = email;
                console.log(`Reset code for ${email}: ${resetCode}`);
                alert(`Reset code sent to ${email}! (Code: ${resetCode})`);
                forgotPasswordScreen.style.display = 'none';
                resetPasswordScreen.style.display = 'flex';
            } else {
                alert('Email not found!');
            }
        }

        function handleResetPassword(e) {
            e.preventDefault();
            const code = document.getElementById('resetCode').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (code !== resetCode) {
                alert('Invalid reset code!');
                return;
            }
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            const userIndex = users.findIndex(u => u.email === resetEmail);
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                alert('Password reset successful! Please login.');
                resetPasswordScreen.style.display = 'none';
                loginScreen.style.display = 'flex';
            }
        }

        // Main app functions
        function updateUI() {
            const avatarUrl = currentUser.profilePicture || `https://placehold.co/80x80/ef4444/white?text=${currentUser.name.charAt(0)}`;
            headerAvatar.src = avatarUrl;
            profileAvatar.src = avatarUrl;
            editProfileAvatar.src = avatarUrl;
            profileName.textContent = currentUser.name;
            profileEmail.textContent = currentUser.email;
            profileType.textContent = "User Type: Both Donor & Requester";
            profileFullName.textContent = currentUser.name;
            profileEmailValue.textContent = currentUser.email;
            profilePhone.textContent = currentUser.phone || 'Not provided';
            profileBloodType.textContent = currentUser.bloodType || 'Not set';
            profileLocation.textContent = currentUser.location || 'Not set';
            profileCID.textContent = currentUser.cid || 'Not set';
            editFullName.value = currentUser.name;
            editEmail.value = currentUser.email;
            editPhone.value = currentUser.phone || '';
            editBloodType.value = currentUser.bloodType || '';
            editLocation.value = currentUser.location || '';
            editCID.value = currentUser.cid || '';
        }

        function logout() {
            currentUser = null;
            loginScreen.style.display = 'flex';
            mainApp.style.display = 'none';
            document.getElementById('loginForm').reset();
        }

        function toggleUserDropdown() {
            userDropdown.classList.toggle('active');
        }

        function toggleNotifications() {
            notificationsDropdown.classList.toggle('active');
            if (notificationsDropdown.classList.contains('active')) {
                notificationBadge.classList.remove('show');
                notificationBadge.textContent = '0';
            }
        }

        // Role selection functions
        function showRoleSelection() {
            roleSelection.style.display = 'flex';
            unifiedInterface.style.display = 'none';
            profileContent.style.display = 'none';
            editProfileContent.style.display = 'none';

            // Reset tab visibility
            const bloodRequestsTab = document.querySelector('.nav-tab[data-tab="bloodRequests"]');
            const availableDonorsTab = document.querySelector('.nav-tab[data-tab="availableDonors"]');
            bloodRequestsTab.style.display = 'flex';
            availableDonorsTab.style.display = 'flex';
        }

        function showUnifiedInterface() {
            roleSelection.style.display = 'none';
            unifiedInterface.style.display = 'block';
            profileContent.style.display = 'none';
            editProfileContent.style.display = 'none';

            // Hide irrelevant tabs based on role
            const bloodRequestsTab = document.querySelector('.nav-tab[data-tab="bloodRequests"]');
            const availableDonorsTab = document.querySelector('.nav-tab[data-tab="availableDonors"]');

            if (currentUserRole === 'donor') {
                availableDonorsTab.style.display = 'none';
                bloodRequestsTab.style.display = 'flex';
            } else if (currentUserRole === 'requester') {
                bloodRequestsTab.style.display = 'none';
                availableDonorsTab.style.display = 'flex';
            } else {
                bloodRequestsTab.style.display = 'flex';
                availableDonorsTab.style.display = 'flex';
            }

            // Update dashboard action buttons
            dashboardActionButtons.innerHTML = '';
            if (currentUserRole === 'donor') {
                const btn = document.createElement('button');
                btn.className = 'add-btn';
                btn.id = 'addDonationBtn';
                btn.innerHTML = '<i class="fas fa-plus"></i> Add Donation';
                btn.addEventListener('click', openDonationModal);
                dashboardActionButtons.appendChild(btn);
            } else if (currentUserRole === 'requester') {
                const btn = document.createElement('button');
                btn.className = 'add-btn';
                btn.id = 'addRequestBtn';
                btn.innerHTML = '<i class="fas fa-plus"></i> Add Request';
                btn.addEventListener('click', openRequestModal);
                dashboardActionButtons.appendChild(btn);
            }

            currentTab = 'dashboard';
            updateDashboardContent();
        }

        function showProfileView() {
            unifiedInterface.style.display = 'none';
            profileContent.style.display = 'block';
            editProfileContent.style.display = 'none';
        }

        function showEditProfile() {
            unifiedInterface.style.display = 'none';
            profileContent.style.display = 'none';
            editProfileContent.style.display = 'block';
        }

        // Navigation functions
        function switchTab(tab) {
            currentTab = tab;
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(t => {
                if (t.dataset.tab === tab) {
                    t.classList.add('active');
                } else {
                    t.classList.remove('active');
                }
            });
            dashboardContent.style.display = tab === 'dashboard' ? 'block' : 'none';
            bloodRequestsContent.style.display = tab === 'bloodRequests' ? 'block' : 'none';
            availableDonorsContent.style.display = tab === 'availableDonors' ? 'block' : 'none';

            if (tab === 'dashboard') {
                updateDashboardContent();
            } else if (tab === 'bloodRequests') {
                updateBloodRequests();
            } else if (tab === 'availableDonors') {
                updateAvailableDonors();
            }
        }

        function updateDashboardContent() {
            const cardsContainer = document.getElementById('dashboardCards');
            cardsContainer.innerHTML = '';

            if (currentUserRole === 'donor') {
                // Show only user's donations
                const userDonations = donors.filter(d => d.name === currentUser.name);
                if (userDonations.length === 0) {
                    cardsContainer.innerHTML = '<p class="text-gray-600">No donations added yet.</p>';
                } else {
                    userDonations.forEach(donor => {
                        cardsContainer.appendChild(createDonorCardWithDelete(donor));
                    });
                }
            } else if (currentUserRole === 'requester') {
                // Show only user's requests
                const userRequests = requests.filter(r => r.patientName === currentUser.name);
                if (userRequests.length === 0) {
                    cardsContainer.innerHTML = '<p class="text-gray-600">No requests added yet.</p>';
                } else {
                    userRequests.forEach(request => {
                        cardsContainer.appendChild(createRequestCardWithDelete(request));
                    });
                }
            }
        }

        function updateBloodRequests() {
            const cardsContainer = document.getElementById('bloodRequestsCards');
            cardsContainer.innerHTML = '';
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const bloodType = document.getElementById('bloodTypeFilter').value;
            const location = document.getElementById('locationFilter').value.toLowerCase();
            const filteredRequests = requests.filter(request => {
                const matchesSearch = request.patientName.toLowerCase().includes(searchTerm) ||
                                    request.bloodType.toLowerCase().includes(searchTerm) ||
                                    request.location.toLowerCase().includes(searchTerm);
                const matchesBloodType = bloodType === 'all' || request.bloodType === bloodType;
                const matchesLocation = location === '' || request.location.toLowerCase().includes(location);
                return matchesSearch && matchesBloodType && matchesLocation;
            });
            if (filteredRequests.length === 0) {
                cardsContainer.innerHTML = '<p class="text-gray-600">No blood requests found.</p>';
            } else {
                filteredRequests.forEach(request => {
                    cardsContainer.appendChild(createRequestCardForUser(request));
                });
            }
        }

        function updateAvailableDonors() {
            const cardsContainer = document.getElementById('availableDonorsCards');
            cardsContainer.innerHTML = '';
            const searchTerm = document.getElementById('donorSearchInput').value.toLowerCase();
            const bloodType = document.getElementById('donorBloodTypeFilter').value;
            const location = document.getElementById('donorLocationFilter').value.toLowerCase();
            const filteredDonors = donors.filter(donor => {
                const matchesSearch = donor.name.toLowerCase().includes(searchTerm) ||
                                    donor.bloodType.toLowerCase().includes(searchTerm) ||
                                    donor.location.toLowerCase().includes(searchTerm);
                const matchesBloodType = bloodType === 'all' || donor.bloodType === bloodType;
                const matchesLocation = location === '' || donor.location.toLowerCase().includes(location);
                return matchesSearch && matchesBloodType && matchesLocation;
            });
            if (filteredDonors.length === 0) {
                cardsContainer.innerHTML = '<p class="text-gray-600">No available donors found.</p>';
            } else {
                filteredDonors.forEach(donor => {
                    cardsContainer.appendChild(createDonorCardForUser(donor));
                });
            }
        }

        function handleProfileUpdate(e) {
            e.preventDefault();
            const fullName = editFullName.value;
            const email = editEmail.value;
            const phone = editPhone.value;
            const bloodType = editBloodType.value;
            const location = editLocation.value;
            const cid = editCID.value;
            const newPassword = document.getElementById('editNewPassword').value;
            currentUser.name = fullName;
            currentUser.email = email;
            currentUser.phone = phone;
            currentUser.bloodType = bloodType;
            currentUser.location = location;
            currentUser.cid = cid;
            if (newPassword) {
                currentUser.password = newPassword;
            }
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex] = {...currentUser};
            }
            updateUI();
            showProfileView();
            alert('Profile updated successfully!');
        }

        function handleAvatarUpload(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentUser.profilePicture = e.target.result;
                    updateUI();
                    const userIndex = users.findIndex(u => u.id === currentUser.id);
                    if (userIndex !== -1) {
                        users[userIndex].profilePicture = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        }

        function handleFeedbackSubmit(e) {
            e.preventDefault();
            const message = document.getElementById('feedbackMessage').value;
            alert('Thank you for your feedback! We appreciate your input.');
            closeFeedbackModalHandler();
            feedbackForm.reset();
        }

        // Card creation functions
        function createDonorCardWithDelete(donor) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title">${donor.name}</h3>
                    <span class="status-badge ${donor.available ? 'status-available' : 'status-not-available'}">
                        ${donor.available ? 'Available' : 'Not Available'}
                    </span>
                </div>
                <div class="card-info">
                    <div class="info-item">
                        <i class="fas fa-tint"></i>
                        <span><span class="info-label">Blood Type:</span> ${donor.bloodType}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span><span class="info-label">Location:</span> ${donor.location}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span><span class="info-label">Phone:</span> ${donor.phone}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-calendar"></i>
                        <span><span class="info-label">Last Donation:</span> ${donor.lastDonation}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-heart"></i>
                        <span><span class="info-label">Total Donations:</span> ${donor.donations}</span>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="action-btn action-btn-delete" onclick="openDeleteModal('donor', ${donor.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            return card;
        }

        function createRequestCardWithDelete(request) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title">${request.patientName}</h3>
                    <span class="status-badge status-${request.urgency.toLowerCase()}">
                        ${request.urgency} Urgency
                    </span>
                </div>
                <div class="card-info">
                    <div class="info-item">
                        <i class="fas fa-tint"></i>
                        <span><span class="info-label">Blood Type:</span> ${request.bloodType}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span><span class="info-label">Location:</span> ${request.location}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span><span class="info-label">Contact:</span> ${request.contact}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-calendar"></i>
                        <span><span class="info-label">Date Needed:</span> ${request.dateNeeded}</span>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="action-btn action-btn-delete" onclick="openDeleteModal('request', ${request.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            return card;
        }

        function createRequestCardForUser(request) {
            const card = document.createElement('div');
            card.className = 'card';
            const requestConnections = connectionRequests.filter(c => c.requestId === request.id && c.donorId === currentUser.id);
            let connectionHTML = '';
            if (requestConnections.length > 0) {
                requestConnections.forEach(conn => {
                    connectionHTML += `
                        <div class="connection-request">
                            <div class="connection-request-header">
                                <div>Connected with ${conn.donorName}</div>
                                <span class="connection-status connection-status-${conn.status}">
                                    ${conn.status.toUpperCase()}
                                </span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-calendar"></i>
                                <span><span class="info-label">Requested:</span> ${conn.requestedDate}</span>
                            </div>
                            ${conn.status === 'accepted' ? `
                                <div class="info-item">
                                    <i class="fas fa-check"></i>
                                    <span><span class="info-label">Confirmed:</span> ${conn.confirmedDate}</span>
                                </div>
                            ` : ''}
                        </div>
                    `;
                });
            }
            card.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title">${request.patientName}</h3>
                    <span class="status-badge status-${request.urgency.toLowerCase()}">
                        ${request.urgency} Urgency
                    </span>
                </div>
                <div class="card-info">
                    <div class="info-item">
                        <i class="fas fa-tint"></i>
                        <span><span class="info-label">Blood Type:</span> ${request.bloodType}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span><span class="info-label">Location:</span> ${request.location}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span><span class="info-label">Contact:</span> ${request.contact}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-id-card"></i>
                        <span><span class="info-label">CID:</span> ${request.cid}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-calendar"></i>
                        <span><span class="info-label">Date Needed:</span> ${request.dateNeeded}</span>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="action-btn action-btn-donate" onclick="openDonateModal(${request.id}, '${request.patientName}', '${request.bloodType}', '${request.location}')">
                        <i class="fas fa-heart"></i> Donate
                    </button>
                </div>
                ${connectionHTML}
            `;
            return card;
        }

        function createDonorCardForUser(donor) {
            const card = document.createElement('div');
            card.className = 'card';
            const donorConnections = connectionRequests.filter(c => c.donorId === donor.id && c.requesterId === currentUser.id);
            let connectionHTML = '';
            if (donorConnections.length > 0) {
                donorConnections.forEach(conn => {
                    connectionHTML += `
                        <div class="connection-request">
                            <div class="connection-request-header">
                                <div>Connected with ${conn.requesterName}</div>
                                <span class="connection-status connection-status-${conn.status}">
                                    ${conn.status.toUpperCase()}
                                </span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-calendar"></i>
                                <span><span class="info-label">Requested:</span> ${conn.requestedDate}</span>
                            </div>
                            ${conn.status === 'accepted' ? `
                                <div class="info-item">
                                    <i class="fas fa-check"></i>
                                    <span><span class="info-label">Confirmed:</span> ${conn.confirmedDate}</span>
                                </div>
                            ` : ''}
                        </div>
                    `;
                });
            }
            card.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title">${donor.name}</h3>
                    <span class="status-badge ${donor.available ? 'status-available' : 'status-not-available'}">
                        ${donor.available ? 'Available' : 'Not Available'}
                    </span>
                </div>
                <div class="card-info">
                    <div class="info-item">
                        <i class="fas fa-tint"></i>
                        <span><span class="info-label">Blood Type:</span> ${donor.bloodType}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span><span class="info-label">Location:</span> ${donor.location}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span><span class="info-label">Phone:</span> ${donor.phone}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-id-card"></i>
                        <span><span class="info-label">CID:</span> ${donor.cid}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-calendar"></i>
                        <span><span class="info-label">Last Donation:</span> ${donor.lastDonation}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-heart"></i>
                        <span><span class="info-label">Total Donations:</span> ${donor.donations}</span>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="action-btn action-btn-connect" onclick="openConnectModal(${donor.id}, '${donor.name}', '${donor.bloodType}', '${donor.location}')">
                        <i class="fas fa-handshake"></i> Connect
                    </button>
                </div>
                ${connectionHTML}
            `;
            return card;
        }

        // Modal functions
        function openDonationModal() {
            document.getElementById('donorName').value = currentUser.name;
            document.getElementById('donorCID').value = currentUser.cid || '';
            addDonationModal.classList.add('active');
        }

        function openRequestModal() {
            document.getElementById('patientName').value = currentUser.name;
            document.getElementById('requestCID').value = currentUser.cid || '';
            addRequestModal.classList.add('active');
        }

        function openConnectModal(donorId, donorName, donorBloodType, donorLocation) {
            const modalContent = document.getElementById('connectModalContent');
            modalContent.innerHTML = `
                <div class="form-group">
                    <label class="form-label">Donor</label>
                    <div class="form-input" style="background: #f3f4f6; padding: 12px; border-radius: 8px;">
                        <strong>${donorName}</strong> (${donorBloodType})<br>
                        Location: ${donorLocation}
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Your Information</label>
                    <div class="form-input" style="background: #f3f4f6; padding: 12px; border-radius: 8px;">
                        <strong>${currentUser.name}</strong><br>
                        Email: ${currentUser.email}<br>
                        Phone: ${currentUser.phone || 'Not provided'}
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea class="form-input" id="connectMessage" rows="4" placeholder="Tell the donor why you need their help..."></textarea>
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-btn modal-btn-cancel" id="cancelConnect">Cancel</button>
                    <button type="button" class="modal-btn modal-btn-submit" onclick="handleConnect(${donorId}, '${donorName}', '${donorBloodType}', '${donorLocation}')">Connect</button>
                </div>
            `;
            connectModal.classList.add('active');
        }

        function openDonateModal(requestId, patientName, bloodType, location) {
            const modalContent = document.getElementById('donateModalContent');
            modalContent.innerHTML = `
                <div class="form-group">
                    <label class="form-label">Request</label>
                    <div class="form-input" style="background: #f3f4f6; padding: 12px; border-radius: 8px;">
                        <strong>${patientName}</strong> (${bloodType})<br>
                        Location: ${location}
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Your Information</label>
                    <div class="form-input" style="background: #f3f4f6; padding: 12px; border-radius: 8px;">
                        <strong>${currentUser.name}</strong><br>
                        Email: ${currentUser.email}<br>
                        Phone: ${currentUser.phone || 'Not provided'}
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea class="form-input" id="donateMessage" rows="4" placeholder="Tell the requester about your availability..."></textarea>
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-btn modal-btn-cancel" id="cancelDonate">Cancel</button>
                    <button type="button" class="modal-btn modal-btn-submit" onclick="handleDonate(${requestId}, '${patientName}', '${bloodType}', '${location}')">Donate</button>
                </div>
            `;
            donateModal.classList.add('active');
        }

        function openDeleteModal(type, id) {
            const modalContent = document.getElementById('deleteModalContent');
            const item = type === 'donor' ? donors.find(d => d.id === id) : requests.find(r => r.id === id);
            modalContent.innerHTML = `
                <p>Are you sure you want to delete this ${type === 'donor' ? 'donation' : 'request'}?</p>
                <div style="margin: 15px 0; padding: 10px; background: #fee2e2; border-radius: 8px;">
                    <strong>${type === 'donor' ? item.name : item.patientName}</strong><br>
                    Blood Type: ${type === 'donor' ? item.bloodType : item.bloodType}
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-btn modal-btn-cancel" id="cancelDelete">Cancel</button>
                    <button type="button" class="modal-btn modal-btn-submit" onclick="handleDelete('${type}', ${id})">Delete</button>
                </div>
            `;
            deleteModal.classList.add('active');
        }

        function closeDonationModalHandler() {
            addDonationModal.classList.remove('active');
            donationForm.reset();
        }

        function closeRequestModalHandler() {
            addRequestModal.classList.remove('active');
            requestForm.reset();
        }

        function closeConnectModalHandler() {
            connectModal.classList.remove('active');
        }

        function closeDonateModalHandler() {
            donateModal.classList.remove('active');
        }

        function closeDeleteModalHandler() {
            deleteModal.classList.remove('active');
        }

        function closeFeedbackModalHandler() {
            feedbackModal.classList.remove('active');
            feedbackForm.reset();
        }

        function closeAboutModalHandler() {
            aboutModal.classList.remove('active');
        }

        // Form submission handlers
        function handleDonationSubmit(e) {
            e.preventDefault();
            const newDonor = {
                id: donors.length + 1,
                name: document.getElementById('donorName').value,
                bloodType: document.getElementById('donorBloodType').value,
                location: document.getElementById('donorLocation').value,
                phone: document.getElementById('donorPhone').value,
                lastDonation: document.getElementById('lastDonation').value,
                available: true,
                donations: 1,
                cid: document.getElementById('donorCID').value
            };
            donors.push(newDonor);
            closeDonationModalHandler();
            updateDashboardContent();
            if (currentTab === 'availableDonors') {
                updateAvailableDonors();
            }
        }

        function handleRequestSubmit(e) {
            e.preventDefault();
            const newRequest = {
                id: requests.length + 1,
                patientName: document.getElementById('patientName').value,
                bloodType: document.getElementById('requestBloodType').value,
                location: document.getElementById('requestLocation').value,
                urgency: document.getElementById('requestUrgency').value,
                contact: document.getElementById('requestContact').value,
                dateNeeded: document.getElementById('dateNeeded').value,
                status: 'Active',
                cid: document.getElementById('requestCID').value
            };
            requests.push(newRequest);
            closeRequestModalHandler();
            updateDashboardContent();
            if (currentTab === 'bloodRequests') {
                updateBloodRequests();
            }
        }

        function handleConnect(donorId, donorName, donorBloodType, donorLocation) {
            const message = document.getElementById('connectMessage').value;
            if (!message.trim()) {
                alert('Please enter a message to connect with the donor.');
                return;
            }
            const connection = {
                id: connectionRequests.length + 1,
                donorId: donorId,
                donorName: donorName,
                donorBloodType: donorBloodType,
                donorLocation: donorLocation,
                requesterId: currentUser.id,
                requesterName: currentUser.name,
                requesterEmail: currentUser.email,
                requesterPhone: currentUser.phone,
                requestId: 0,
                requestedDate: new Date().toISOString().split('T')[0],
                status: 'pending',
                message: message
            };
            connectionRequests.push(connection);
            const donorUser = users.find(u => u.name === donorName);
            if (donorUser) {
                addNotification(donorUser.id, `${currentUser.name} wants to connect with you for blood donation!`, 'connection');
            }
            closeConnectModalHandler();
            updateAvailableDonors();
            alert('Connection request sent successfully!');
        }

        function handleDonate(requestId, patientName, bloodType, location) {
            const message = document.getElementById('donateMessage').value;
            if (!message.trim()) {
                alert('Please enter a message to connect with the requester.');
                return;
            }
            const connection = {
                id: connectionRequests.length + 1,
                donorId: currentUser.id,
                donorName: currentUser.name,
                donorBloodType: currentUser.bloodType,
                donorLocation: currentUser.location,
                requesterId: 0,
                requesterName: patientName,
                requesterEmail: '',
                requesterPhone: '',
                requestId: requestId,
                requestedDate: new Date().toISOString().split('T')[0],
                status: 'pending',
                message: message
            };
            connectionRequests.push(connection);
            const request = requests.find(r => r.id === requestId);
            if (request) {
                const requesterUser = users.find(u => u.name === request.patientName);
                if (requesterUser) {
                    addNotification(requesterUser.id, `${currentUser.name} wants to donate blood to you!`, 'donation');
                }
            }
            closeDonateModalHandler();
            updateBloodRequests();
            alert('Donation offer sent successfully!');
        }

        function handleDelete(type, id) {
            if (type === 'donor') {
                const index = donors.findIndex(d => d.id === id);
                if (index !== -1) {
                    donors.splice(index, 1);
                    alert('Donation deleted successfully!');
                }
            } else {
                const index = requests.findIndex(r => r.id === id);
                if (index !== -1) {
                    requests.splice(index, 1);
                    alert('Request deleted successfully!');
                }
            }
            closeDeleteModalHandler();
            updateDashboardContent();
            if (currentTab === 'bloodRequests') {
                updateBloodRequests();
            } else if (currentTab === 'availableDonors') {
                updateAvailableDonors();
            }
        }

        // Notification functions
        function addNotification(userId, message, type) {
            const notification = {
                id: notifications.length + 1,
                userId: userId,
                message: message,
                type: type,
                timestamp: new Date().toISOString(),
                read: false
            };
            notifications.push(notification);
            updateNotifications();
        }

        function updateNotifications() {
            if (!currentUser) return;
            const userNotifications = notifications.filter(n => n.userId === currentUser.id && !n.read);
            notificationBadge.textContent = userNotifications.length;
            notificationBadge.classList.toggle('show', userNotifications.length > 0);
            if (userNotifications.length === 0) {
                notificationsList.innerHTML = '<div class="notification-empty">No new notifications</div>';
            } else {
                notificationsList.innerHTML = userNotifications.map(notification => {
                    const timeAgo = getTimeAgo(notification.timestamp);
                    return `
                        <div class="notification-item">
                            <div class="notification-content">${notification.message}</div>
                            <div class="notification-time">${timeAgo}</div>
                        </div>
                    `;
                }).join('');
            }
        }

        function getTimeAgo(timestamp) {
            const now = new Date();
            const then = new Date(timestamp);
            const diffInSeconds = Math.floor((now - then) / 1000);
            if (diffInSeconds < 60) return 'Just now';
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
            return `${Math.floor(diffInSeconds / 86400)} days ago`;
        }

        // Initialize the app
        document.addEventListener('DOMContentLoaded', init);