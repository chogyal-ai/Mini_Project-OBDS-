// FRONTEND-BACKEND INTEGRATION WITH ALL FEATURES

        // API Base URL - Change this if your backend runs on a different port/host
        const API_BASE_URL = 'http://localhost:5000/api';

        // DOM Elements
        const loginPage = document.getElementById('loginPage');
        const dashboardContainer = document.getElementById('dashboardContainer');
        const loginForm = document.getElementById('loginForm');
        const forgotPassword = document.getElementById('forgotPassword');
        const logoutBtn = document.getElementById('logoutBtn');
        const sidebarMenuItems = document.querySelectorAll('.menu-item');
        const notificationsIcon = document.getElementById('notificationsIcon');
        const profileIcon = document.getElementById('profileIcon');
        const forgotPasswordModal = document.getElementById('forgotPasswordModal');
        const closeForgotPassword = document.getElementById('closeForgotPassword');
        const resetEmail = document.getElementById('resetEmail');
        const nextStep = document.getElementById('nextStep');
        const prevStep = document.getElementById('prevStep');
        const step1 = document.getElementById('step1');
        const step2 = document.getElementById('step2');
        const step3 = document.getElementById('step3');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        
        // Page Elements
        const dashboardPage = document.getElementById('dashboardPage');
        const addDonorPage = document.getElementById('addDonorPage');
        const addRequesterPage = document.getElementById('addRequesterPage');
        const requesterListPage = document.getElementById('requesterListPage');
        const donorListPage = document.getElementById('donorListPage');
        const generateReportPage = document.getElementById('generateReportPage');
        const profilePage = document.getElementById('profilePage');
        const donorCountElement = document.getElementById('donorCount');
        const requestCountElement = document.getElementById('requestCount');
        const recentDonationsList = document.getElementById('recentDonationsList');
        const requesterTableBody = document.getElementById('requesterTableBody');
        const donorTableBody = document.getElementById('donorTableBody');
        
        // Form Elements
        const addDonorForm = document.getElementById('addDonorForm');
        const addRequesterForm = document.getElementById('addRequesterForm');
        const cancelAddDonor = document.getElementById('cancelAddDonor');
        const cancelAddRequester = document.getElementById('cancelAddRequester');
        const profileForm = document.getElementById('profileForm');
        const cancelProfile = document.getElementById('cancelProfile');
        const clearFilters = document.getElementById('clearFilters');
        const generateReportBtn = document.getElementById('generateReportBtn');
        
        // Current Step for Password Reset
        let currentStep = 1;
        
        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Set up event listeners
            setupEventListeners();
            
            // Check if user is already logged in
            checkLoggedInStatus();
        });
        
        // Setup all event listeners
        function setupEventListeners() {
            // Login Form
            loginForm.addEventListener('submit', handleLogin);
            
            // Forgot Password
            forgotPassword.addEventListener('click', showForgotPasswordModal);
            
            // Logout
            logoutBtn.addEventListener('click', handleLogout);
            
            // Sidebar Menu
            sidebarMenuItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    setActivePage(this.getAttribute('data-page'));
                    
                    // Load data when switching to certain pages
                    if (this.getAttribute('data-page') === 'donorList') {
                        loadDonors();
                    } else if (this.getAttribute('data-page') === 'requesterList') {
                        loadRequesters();
                    } else if (this.getAttribute('data-page') === 'profile') {
                        loadProfile();
                    } else if (this.getAttribute('data-page') === 'dashboard') {
                        loadDashboardData();
                    }
                    
                    // Close sidebar on mobile after selection
                    if (window.innerWidth <= 768) {
                        document.getElementById('sidebar').classList.remove('active');
                    }
                });
            });
            
            // Toggle Sidebar for Mobile
            const toggleSidebar = document.getElementById('toggleSidebar');
            if (toggleSidebar) {
                toggleSidebar.addEventListener('click', function() {
                    document.getElementById('sidebar').classList.toggle('active');
                });
            }
            
            // Notifications (FIXED - now shows real notifications)
            notificationsIcon.addEventListener('click', loadNotifications);
            
            // Profile
            profileIcon.addEventListener('click', showProfilePage);
            
            // Close Forgot Password Modal
            closeForgotPassword.addEventListener('click', closeForgotPasswordModal);
            
            // Password Reset Steps
            nextStep.addEventListener('click', goToNextStep);
            prevStep.addEventListener('click', goToPrevStep);
            
            // Form Submissions
            addDonorForm.addEventListener('submit', handleAddDonor);
            addRequesterForm.addEventListener('submit', handleAddRequester);
            profileForm.addEventListener('submit', handleUpdateProfile);
            
            // Cancel Buttons
            cancelAddDonor.addEventListener('click', cancelAddDonorForm);
            cancelAddRequester.addEventListener('click', cancelAddRequesterForm);
            cancelProfile.addEventListener('click', cancelProfileForm);
            
            // Clear Filters
            clearFilters.addEventListener('click', clearReportFilters);
            
            // Generate Report
            generateReportBtn.addEventListener('click', generateReport);
            
            // Password Strength
            const newPasswordInput = document.getElementById('newPassword');
            const newResetPasswordInput = document.getElementById('newResetPassword');
            
            if (newPasswordInput) {
                newPasswordInput.addEventListener('input', updatePasswordStrength);
            }
            
            if (newResetPasswordInput) {
                newResetPasswordInput.addEventListener('input', updateResetPasswordStrength);
            }
            
            // File Input for Profile Picture
            const profilePictureInput = document.getElementById('profilePicture');
            if (profilePictureInput) {
                profilePictureInput.addEventListener('change', handleProfilePictureUpload);
            }
        }
        
        // ======================
        // AUTHENTICATION FUNCTIONS
        // ======================
        
        // Handle Login - CONNECTED TO BACKEND
        async function handleLogin(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (!username || !password) {
                showError('Please fill in all fields');
                return;
            }
            
            showLoading();
            
            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Save token and admin data to localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('admin', JSON.stringify(data.admin));
                    
                    // Hide login page, show dashboard
                    loginPage.style.display = 'none';
                    dashboardContainer.style.display = 'flex';
                    
                    // Hide loading
                    hideLoading();
                    
                    // Show success message
                    showSuccess('Login successful!');
                    
                    // Set active page to dashboard
                    setActivePage('dashboard');
                    
                    // Load dashboard data
                    loadDashboardData();
                } else {
                    // Login failed
                    hideLoading();
                    showError(data.message || 'Invalid username or password');
                }
            } catch (error) {
                hideLoading();
                showError('Network error. Please check if backend is running.');
            }
        }
        
        // Handle Logout
        function handleLogout(e) {
            e.preventDefault();
            
            // Remove login status from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            
            // Show login page, hide dashboard
            loginPage.style.display = 'flex';
            dashboardContainer.style.display = 'none';
            
            // Reset form
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            
            // Show success message
            showSuccess('Logged out successfully!');
        }
        
        // Check Logged In Status
        function checkLoggedInStatus() {
            const token = localStorage.getItem('token');
            
            if (token) {
                // User is logged in
                loginPage.style.display = 'none';
                dashboardContainer.style.display = 'flex';
                
                // Set active page to dashboard
                setActivePage('dashboard');
                loadDashboardData();
            } else {
                // User is not logged in
                loginPage.style.display = 'flex';
                dashboardContainer.style.display = 'none';
            }
        }
        
        // Get auth header for API calls
        function getAuthHeader() {
            const token = localStorage.getItem('token');
            return token ? { 'Authorization': `Bearer ${token}` } : {};
        }
        
        // ======================
        // PAGE NAVIGATION
        // ======================
        
        // Set Active Page
        function setActivePage(pageName) {
            // Hide all pages
            dashboardPage.style.display = 'none';
            addDonorPage.style.display = 'none';
            addRequesterPage.style.display = 'none';
            requesterListPage.style.display = 'none';
            donorListPage.style.display = 'none';
            generateReportPage.style.display = 'none';
            profilePage.style.display = 'none';
            
            // Show selected page
            switch(pageName) {
                case 'dashboard':
                    dashboardPage.style.display = 'block';
                    break;
                case 'addDonor':
                    addDonorPage.style.display = 'block';
                    break;
                case 'addRequester':
                    addRequesterPage.style.display = 'block';
                    break;
                case 'requesterList':
                    requesterListPage.style.display = 'block';
                    break;
                case 'donorList':
                    donorListPage.style.display = 'block';
                    break;
                case 'generateReport':
                    generateReportPage.style.display = 'block';
                    break;
                case 'profile':
                    profilePage.style.display = 'block';
                    break;
            }
            
            // Update active menu item
            sidebarMenuItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-page') === pageName) {
                    item.classList.add('active');
                }
            });
        }
        
        // ======================
        // DASHBOARD FUNCTIONS
        // ======================
        
        // Load Dashboard Data
        async function loadDashboardData() {
            showLoading();
            
            try {
                // Fetch donors and requesters in parallel
                const [donorsResponse, requestersResponse] = await Promise.all([
                    fetch(`${API_BASE_URL}/donors`, { headers: getAuthHeader() }),
                    fetch(`${API_BASE_URL}/requesters`, { headers: getAuthHeader() })
                ]);
                
                if (donorsResponse.ok && requestersResponse.ok) {
                    const donors = await donorsResponse.json();
                    const requesters = await requestersResponse.json();
                    
                    // Update stats
                    donorCountElement.textContent = donors.length;
                    requestCountElement.textContent = requesters.length;
                    
                    // Update recent donations
                    updateRecentDonations(donors);
                    
                    // Update notifications badge
                    updateNotificationBadge(requesters);
                }
            } catch (error) {
                showError('Failed to load dashboard data');
            } finally {
                hideLoading();
            }
        }
        
        // Update Recent Donations
        function updateRecentDonations(donors) {
            // Sort donors by last_donation (most recent first)
            const sortedDonors = donors
                .filter(donor => donor.last_donation)
                .sort((a, b) => new Date(b.last_donation) - new Date(a.last_donation))
                .slice(0, 4); // Get top 4
            
            if (sortedDonors.length === 0) {
                recentDonationsList.innerHTML = '<p style="text-align: center; color: #6c757d;">No recent donations</p>';
                return;
            }
            
            recentDonationsList.innerHTML = sortedDonors.map(donor => `
                <div class="donation-item">
                    <div class="donor-info">
                        <div class="donor-avatar">${donor.full_name.charAt(0)}</div>
                        <div class="donor-details">
                            <div class="donor-name">${donor.full_name}</div>
                            <div class="donor-date">${donor.last_donation}</div>
                        </div>
                    </div>
                    <div class="blood-type">${donor.blood_type}</div>
                </div>
            `).join('');
        }
        
        // Update Notification Badge
        function updateNotificationBadge(requesters) {
            const pendingCount = requesters.filter(r => r.status === 'pending').length;
            const badge = document.querySelector('.badge');
            
            if (badge) {
                badge.textContent = pendingCount;
                badge.style.display = pendingCount > 0 ? 'block' : 'none';
            }
        }
        
        // ======================
        // DONOR FUNCTIONS
        // ======================
        
        // Load Donors from Backend
        async function loadDonors() {
            showLoading();
            
            try {
                const response = await fetch(`${API_BASE_URL}/donors`, {
                    headers: getAuthHeader()
                });
                
                if (response.ok) {
                    const donors = await response.json();
                    populateDonorTable(donors);
                } else {
                    const error = await response.json();
                    showError(error.message || 'Failed to load donors');
                }
            } catch (error) {
                showError('Network error. Please try again.');
            } finally {
                hideLoading();
            }
        }
        
        // Populate Donor Table
        function populateDonorTable(donors) {
            donorTableBody.innerHTML = '';
            
            donors.forEach(donor => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${donor.full_name}</td>
                    <td>${donor.blood_type}</td>
                    <td>${donor.age}</td>
                    <td>${donor.gender.charAt(0).toUpperCase() + donor.gender.slice(1)}</td>
                    <td>${donor.last_donation ? donor.last_donation : 'Never'}</td>
                    <td><span style="color: ${donor.availability === 'available' ? '#4cc9f0' : '#457b9d'}; font-weight: 600;">${donor.availability.charAt(0).toUpperCase() + donor.availability.slice(1)}</span></td>
                    <td class="table-actions">
                        <button class="btn-action btn-view" onclick="viewDonor(${donor.id})">View</button>
                        <button class="btn-action btn-edit" onclick="editDonor(${donor.id})">Edit</button>
                        <button class="btn-action btn-delete" onclick="deleteDonor(${donor.id})">Delete</button>
                    </td>
                `;
                donorTableBody.appendChild(row);
            });
        }
        
        // Handle Add Donor Form - CONNECTED TO BACKEND
        async function handleAddDonor(e) {
            e.preventDefault();
            
            const donorData = {
                full_name: document.getElementById('donorName').value.trim(),
                date_of_birth: document.getElementById('donorDob').value,
                age: calculateAge(document.getElementById('donorDob').value),
                gender: document.getElementById('donorGender').value,
                blood_type: document.getElementById('donorBloodType').value,
                phone: document.getElementById('donorPhone').value.trim(),
                email: document.getElementById('donorEmail').value.trim() || null,
                address: document.getElementById('donorAddress').value.trim() || null,
                last_donation: document.getElementById('donorLastDonation').value || null,
                availability: document.getElementById('donorAvailability').value
            };
            
            // Validate required fields
            if (!donorData.full_name || !donorData.date_of_birth || !donorData.gender || !donorData.blood_type || !donorData.phone) {
                showError('Please fill in all required fields');
                return;
            }
            
            showLoading();
            
            try {
                const response = await fetch(`${API_BASE_URL}/donors`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getAuthHeader()
                    },
                    body: JSON.stringify(donorData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    hideLoading();
                    showSuccess('Donor added successfully!');
                    addDonorForm.reset();
                    setActivePage('dashboard');
                    loadDashboardData(); // Refresh dashboard stats
                } else {
                    hideLoading();
                    showError(result.message || 'Failed to add donor');
                }
            } catch (error) {
                hideLoading();
                showError('Network error. Please try again.');
            }
        }
        
        // Calculate age from date of birth
        function calculateAge(dob) {
            const today = new Date();
            const birthDate = new Date(dob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
        }
        
        // View Donor
        async function viewDonor(id) {
            showLoading();
            
            try {
                const response = await fetch(`${API_BASE_URL}/donors/${id}`, {
                    headers: getAuthHeader()
                });
                
                if (response.ok) {
                    const donor = await response.json();
                    alert(`Viewing Donor ID: ${donor.id}\nName: ${donor.full_name}\nBlood Type: ${donor.blood_type}\nAge: ${donor.age}\nGender: ${donor.gender}\nLast Donation: ${donor.last_donation || 'Never'}\nAvailability: ${donor.availability}`);
                } else {
                    const error = await response.json();
                    showError(error.message || 'Failed to load donor details');
                }
            } catch (error) {
                showError('Network error. Please try again.');
            } finally {
                hideLoading();
            }
        }
        
        // Edit Donor
        async function editDonor(id) {
            showSuccess(`Editing donor #${id}`);
            alert(`In a complete implementation, this would open an edit form pre-filled with donor #${id} data.`);
        }
        
        // Delete Donor - CONNECTED TO BACKEND
        async function deleteDonor(id) {
            if (confirm(`Are you sure you want to delete Donor #${id}?`)) {
                showLoading();
                
                try {
                    const response = await fetch(`${API_BASE_URL}/donors/${id}`, {
                        method: 'DELETE',
                        headers: getAuthHeader()
                    });
                    
                    if (response.ok) {
                        showSuccess(`Donor #${id} deleted successfully!`);
                        // Reload donors list
                        loadDonors();
                        // Refresh dashboard
                        loadDashboardData();
                    } else {
                        const error = await response.json();
                        showError(error.message || 'Failed to delete donor');
                    }
                } catch (error) {
                    showError('Network error. Please try again.');
                } finally {
                    hideLoading();
                }
            }
        }
        
        // Cancel Add Donor Form
        function cancelAddDonorForm() {
            // Reset form
            addDonorForm.reset();
            
            // Navigate back to dashboard
            setActivePage('dashboard');
        }
        
        // ======================
        // REQUESTER FUNCTIONS
        // ======================
        
        // Load Requesters from Backend
        async function loadRequesters() {
            showLoading();
            
            try {
                const response = await fetch(`${API_BASE_URL}/requesters`, {
                    headers: getAuthHeader()
                });
                
                if (response.ok) {
                    const requesters = await response.json();
                    populateRequesterTable(requesters);
                } else {
                    const error = await response.json();
                    showError(error.message || 'Failed to load requesters');
                }
            } catch (error) {
                showError('Network error. Please try again.');
            } finally {
                hideLoading();
            }
        }
        
        // Handle Add Requester Form - CONNECTED TO BACKEND
        async function handleAddRequester(e) {
            e.preventDefault();
            
            const requesterData = {
                name: document.getElementById('requesterName').value.trim(),
                date_of_birth: document.getElementById('requesterDob').value,
                blood_type: document.getElementById('requesterBloodType').value,
                quantity: parseInt(document.getElementById('requesterQuantity').value.trim()),
                urgency: document.getElementById('requesterUrgency').value,
                date_requested: document.getElementById('requesterDateRequested').value,
                contact_info: document.getElementById('requesterContact').value.trim(),
                status: document.getElementById('requesterStatus').value
            };
            
            // Validate required fields
            if (!requesterData.name || !requesterData.date_of_birth || !requesterData.blood_type || !requesterData.quantity || !requesterData.urgency || !requesterData.date_requested || !requesterData.contact_info) {
                showError('Please fill in all required fields');
                return;
            }
            
            showLoading();
            
            try {
                const response = await fetch(`${API_BASE_URL}/requesters`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getAuthHeader()
                    },
                    body: JSON.stringify(requesterData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    hideLoading();
                    showSuccess('Requester added successfully!');
                    addRequesterForm.reset();
                    setActivePage('dashboard');
                    loadDashboardData(); // Refresh dashboard stats
                } else {
                    hideLoading();
                    showError(result.message || 'Failed to add requester');
                }
            } catch (error) {
                hideLoading();
                showError('Network error. Please try again.');
            }
        }
        
        // Populate Requester Table
        function populateRequesterTable(requesters) {
            requesterTableBody.innerHTML = '';
            
            requesters.forEach(requester => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${requester.name}</td>
                    <td>${requester.blood_type}</td>
                    <td>${requester.quantity}</td>
                    <td><span style="color: ${requester.urgency === 'high' ? '#e63946' : requester.urgency === 'medium' ? '#f7b500' : '#457b9d'}; font-weight: 600;">${requester.urgency.charAt(0).toUpperCase() + requester.urgency.slice(1)}</span></td>
                    <td>${requester.date_requested}</td>
                    <td><span style="color: ${requester.status === 'pending' ? '#457b9d' : '#4cc9f0'}; font-weight: 600;">${requester.status.charAt(0).toUpperCase() + requester.status.slice(1)}</span></td>
                    <td class="table-actions">
                        <button class="btn-action btn-view" onclick="viewRequester(${requester.id})">View</button>
                        <button class="btn-action btn-edit" onclick="editRequester(${requester.id})">Edit</button>
                        <button class="btn-action btn-delete" onclick="deleteRequester(${requester.id})">Delete</button>
                    </td>
                `;
                requesterTableBody.appendChild(row);
            });
        }
        
        // View Requester
        async function viewRequester(id) {
            showLoading();
            
            try {
                const response = await fetch(`${API_BASE_URL}/requesters/${id}`, {
                    headers: getAuthHeader()
                });
                
                if (response.ok) {
                    const requester = await response.json();
                    
                    // Update modal content
                    document.getElementById('viewName').textContent = requester.name;
                    document.getElementById('viewBloodType').textContent = requester.blood_type;
                    document.getElementById('viewQuantity').textContent = requester.quantity;
                    document.getElementById('viewUrgency').textContent = requester.urgency.charAt(0).toUpperCase() + requester.urgency.slice(1);
                    document.getElementById('viewDate').textContent = requester.date_requested;
                    document.getElementById('viewStatus').textContent = requester.status.charAt(0).toUpperCase() + requester.status.slice(1);
                    
                    document.getElementById('viewModal').style.display = 'flex';
                } else {
                    const error = await response.json();
                    showError(error.message || 'Failed to load requester details');
                }
            } catch (error) {
                showError('Network error. Please try again.');
            } finally {
                hideLoading();
            }
        }
        
        function closeViewModal() {
            document.getElementById('viewModal').style.display = 'none';
        }
        
        // Edit Requester
        async function editRequester(id) {
            showSuccess(`Editing requester #${id}`);
            alert(`In a complete implementation, this would open an edit form pre-filled with requester #${id} data.`);
        }
        
        // Delete Requester - CONNECTED TO BACKEND
        async function deleteRequester(id) {
            if (confirm(`Are you sure you want to delete Requester #${id}?`)) {
                showLoading();
                
                try {
                    const response = await fetch(`${API_BASE_URL}/requesters/${id}`, {
                        method: 'DELETE',
                        headers: getAuthHeader()
                    });
                    
                    if (response.ok) {
                        showSuccess(`Requester #${id} deleted successfully!`);
                        // Reload requesters list
                        loadRequesters();
                        // Refresh dashboard
                        loadDashboardData();
                    } else {
                        const error = await response.json();
                        showError(error.message || 'Failed to delete requester');
                    }
                } catch (error) {
                    showError('Network error. Please try again.');
                } finally {
                    hideLoading();
                }
            }
        }
        
        // Cancel Add Requester Form
        function cancelAddRequesterForm() {
            // Reset form
            addRequesterForm.reset();
            
            // Navigate back to dashboard
            setActivePage('dashboard');
        }
        
        // ======================
        // NOTIFICATIONS FUNCTIONS (FIXED)
        // ======================
        
        // Load Notifications from Backend (FIXED)
        async function loadNotifications() {
            showLoading();
            
            try {
                // Fetch donors and requesters
                const [donorsResponse, requestersResponse] = await Promise.all([
                    fetch(`${API_BASE_URL}/donors`, { headers: getAuthHeader() }),
                    fetch(`${API_BASE_URL}/requesters`, { headers: getAuthHeader() })
                ]);
                
                if (donorsResponse.ok && requestersResponse.ok) {
                    const donors = await donorsResponse.json();
                    const requesters = await requestersResponse.json();
                    
                    // Create notifications
                    const notifications = [];
                    
                    // Pending requesters notification
                    const pendingRequesters = requesters.filter(r => r.status === 'pending');
                    if (pendingRequesters.length > 0) {
                        notifications.push({
                            id: 1,
                            message: `${pendingRequesters.length} blood request${pendingRequesters.length > 1 ? 's are' : ' is'} pending`,
                            time: new Date().toLocaleTimeString(),
                            type: 'urgent'
                        });
                    }
                    
                    // Low donor count notification
                    if (donors.length < 5) {
                        notifications.push({
                            id: 2,
                            message: 'Blood donor count is low',
                            time: new Date().toLocaleTimeString(),
                            type: 'warning'
                        });
                    }
                    
                    // Recent donation notification
                    const recentDonations = donors.filter(d => d.last_donation && 
                        new Date(d.last_donation) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
                    if (recentDonations.length > 0) {
                        notifications.push({
                            id: 3,
                            message: `${recentDonations.length} new donation${recentDonations.length > 1 ? 's' : ''} this week`,
                            time: new Date().toLocaleTimeString(),
                            type: 'info'
                        });
                    }
                    
                    // Show notifications
                    showNotificationsModal(notifications);
                }
            } catch (error) {
                showError('Failed to load notifications');
            } finally {
                hideLoading();
            }
        }
        
        // Show Notifications Modal (FIXED)
        function showNotificationsModal(notifications) {
            // Create modal if it doesn't exist
            let notificationModal = document.getElementById('notificationModal');
            if (!notificationModal) {
                notificationModal = document.createElement('div');
                notificationModal.id = 'notificationModal';
                notificationModal.className = 'modal';
                notificationModal.innerHTML = `
                    <div class="modal-content" style="max-width: 500px;">
                        <div class="modal-header">
                            <h2 class="modal-title">Notifications</h2>
                            <div class="close-modal" onclick="document.getElementById('notificationModal').style.display='none'">&times;</div>
                        </div>
                        <div class="modal-body" id="notificationList">
                            <!-- Notifications will be inserted here -->
                        </div>
                        <div class="modal-footer">
                            <button class="modal-btn modal-btn-primary" onclick="document.getElementById('notificationModal').style.display='none'">Close</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(notificationModal);
            }
            
            // Populate notifications
            const notificationList = document.getElementById('notificationList');
            if (notifications.length > 0) {
                notificationList.innerHTML = notifications.map(n => `
                    <div style="padding: 10px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
                        <span>${n.message}</span>
                        <span style="color: #6c757d; font-size: 12px;">${n.time}</span>
                    </div>
                `).join('');
            } else {
                notificationList.innerHTML = '<p style="text-align: center; color: #6c757d;">No notifications</p>';
            }
            
            // Show modal
            notificationModal.style.display = 'flex';
            
            // Update badge
            const badge = document.querySelector('.badge');
            if (badge) {
                badge.textContent = notifications.length;
                badge.style.display = notifications.length > 0 ? 'block' : 'none';
            }
        }
        
        // ======================
        // PROFILE FUNCTIONS
        // ======================
        
        // Load Profile from Backend
        async function loadProfile() {
            showLoading();
            
            try {
                const response = await fetch(`${API_BASE_URL}/admin/profile`, {
                    headers: getAuthHeader()
                });
                
                if (response.ok) {
                    const admin = await response.json();
                    
                    // Update profile form with data
                    document.getElementById('profileName').value = admin.full_name;
                    document.getElementById('profileEmail').value = admin.email;
                    document.getElementById('profilePhone').value = admin.phone || '';
                    
                    // Update profile display
                    document.querySelector('.profile-name').textContent = admin.full_name;
                    document.querySelector('.profile-email').textContent = admin.email;
                    
                    // Update avatar if profile picture exists
                    const avatarPreview = document.getElementById('avatarPreview');
                    if (admin.profile_picture) {
                        avatarPreview.style.backgroundImage = `url('${admin.profile_picture}')`;
                        avatarPreview.style.backgroundColor = 'transparent';
                        avatarPreview.innerHTML = '';
                    }
                } else {
                    const error = await response.json();
                    showError(error.message || 'Failed to load profile');
                }
            } catch (error) {
                showError('Network error. Please try again.');
            } finally {
                hideLoading();
            }
        }
        
        // Handle Profile Picture Upload - CONNECTED TO BACKEND
        async function handleProfilePictureUpload(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Validate file type
                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!allowedTypes.includes(file.type)) {
                    showError('Please upload a valid image file (JPEG, PNG, GIF)');
                    return;
                }
                
                // Validate file size (max 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    showError('Image size should not exceed 2MB');
                    return;
                }
                
                // Create FormData for file upload
                const formData = new FormData();
                formData.append('profile_picture', file);
                
                showLoading();
                
                try {
                    const response = await fetch(`${API_BASE_URL}/admin/profile`, {
                        method: 'PUT',
                        headers: getAuthHeader(),
                        body: formData
                    });
                    
                    if (response.ok) {
                        showSuccess('Profile picture updated successfully!');
                        // Reload profile to get updated data
                        loadProfile();
                    } else {
                        const error = await response.json();
                        showError(error.message || 'Failed to upload profile picture');
                    }
                } catch (error) {
                    showError('Network error. Please try again.');
                } finally {
                    hideLoading();
                }
            }
        }
        
        // Handle Update Profile - CONNECTED TO BACKEND
        async function handleUpdateProfile(e) {
            e.preventDefault();
            
            const profileData = {
                full_name: document.getElementById('profileName').value.trim(),
                email: document.getElementById('profileEmail').value.trim(),
                phone: document.getElementById('profilePhone').value.trim() || null
            };
            
            // Validate required fields
            if (!profileData.full_name || !profileData.email) {
                showError('Please fill in all required fields');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(profileData.email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            showLoading();
            
            try {
                const response = await fetch(`${API_BASE_URL}/admin/profile`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getAuthHeader()
                    },
                    body: JSON.stringify(profileData)
                });
                
                if (response.ok) {
                    showSuccess('Profile updated successfully!');
                    // Reload profile to reflect changes
                    loadProfile();
                } else {
                    const error = await response.json();
                    showError(error.message || 'Failed to update profile');
                }
            } catch (error) {
                showError('Network error. Please try again.');
            } finally {
                hideLoading();
            }
        }
        
        // Cancel Profile Form
        function cancelProfileForm() {
            // Reset form to current values
            loadProfile();
            
            // Navigate back to dashboard
            setActivePage('dashboard');
        }
        
        // ======================
        // OTHER FUNCTIONS
        // ======================
        
        // Show Forgot Password Modal
        function showForgotPasswordModal() {
            forgotPasswordModal.style.display = 'flex';
            currentStep = 1;
            updateStepDisplay();
        }
        
        // Close Forgot Password Modal
        function closeForgotPasswordModal() {
            forgotPasswordModal.style.display = 'none';
            resetPasswordForm();
        }
        
        // Go to Next Step in Password Reset
        function goToNextStep() {
            if (currentStep === 1) {
                // Validate email
                const email = resetEmail.value.trim();
                if (!email) {
                    showError('Please enter your email address');
                    return;
                }
                
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showError('Please enter a valid email address');
                    return;
                }
                
                // Show loading
                showLoading();
                
                // Simulate sending email (in real app, this would call backend)
                setTimeout(() => {
                    hideLoading();
                    showSuccess('Verification code sent to your email!');
                    currentStep = 2;
                    updateStepDisplay();
                }, 1500);
                
            } else if (currentStep === 2) {
                // Validate verification code
                const codeInputs = document.querySelectorAll('.code-input');
                let code = '';
                let isValid = true;
                
                codeInputs.forEach(input => {
                    if (input.value.trim() === '') {
                        isValid = false;
                        input.style.borderColor = '#e63946';
                    } else {
                        code += input.value;
                        input.style.borderColor = '#ced4da';
                    }
                });
                
                if (!isValid) {
                    showError('Please enter the complete verification code');
                    return;
                }
                
                // Show loading
                showLoading();
                
                // Simulate code validation
                setTimeout(() => {
                    hideLoading();
                    showSuccess('Verification successful!');
                    currentStep = 3;
                    updateStepDisplay();
                }, 1500);
                
            } else if (currentStep === 3) {
                // Validate new password
                const newPassword = document.getElementById('newResetPassword').value.trim();
                const confirmPassword = document.getElementById('confirmResetPassword').value.trim();
                
                if (!newPassword || !confirmPassword) {
                    showError('Please fill in all password fields');
                    return;
                }
                
                if (newPassword !== confirmPassword) {
                    showError('Passwords do not match');
                    return;
                }
                
                // Validate password strength
                if (getPasswordStrength(newPassword) < 2) {
                    showError('Password is too weak. Please use a stronger password');
                    return;
                }
                
                // Show loading
                showLoading();
                
                // Simulate password update (in real app, this would call backend)
                setTimeout(() => {
                    hideLoading();
                    showSuccess('Password updated successfully!');
                    closeForgotPasswordModal();
                    resetPasswordForm();
                }, 1500);
            }
        }
        
        // Go to Previous Step in Password Reset
        function goToPrevStep() {
            if (currentStep > 1) {
                currentStep--;
                updateStepDisplay();
            }
        }
        
        // Update Step Display
        function updateStepDisplay() {
            // Hide all steps
            step1.style.display = 'none';
            step2.style.display = 'none';
            step3.style.display = 'none';
            
            // Show current step
            if (currentStep === 1) {
                step1.style.display = 'block';
                prevStep.style.display = 'none';
            } else if (currentStep === 2) {
                step2.style.display = 'block';
                prevStep.style.display = 'inline-block';
            } else if (currentStep === 3) {
                step3.style.display = 'block';
                prevStep.style.display = 'inline-block';
            }
            
            // Update button text
            if (currentStep === 3) {
                nextStep.textContent = 'Reset Password';
            } else {
                nextStep.textContent = 'Next';
            }
        }
        
        // Reset Password Form
        function resetPasswordForm() {
            resetEmail.value = '';
            document.querySelectorAll('.code-input').forEach(input => {
                input.value = '';
                input.style.borderColor = '#ced4da';
            });
            document.getElementById('newResetPassword').value = '';
            document.getElementById('confirmResetPassword').value = '';
            document.getElementById('resetStrengthFill').style.width = '0%';
            document.getElementById('resetStrengthFill').className = 'strength-fill';
            currentStep = 1;
            updateStepDisplay();
        }
        
        // Clear Report Filters
        function clearReportFilters() {
            document.getElementById('reportType').value = '';
            document.getElementById('reportMonth').value = '';
            document.getElementById('reportYear').value = '';
            document.getElementById('reportBloodType').value = '';
            
            // Show chart placeholder
            document.querySelector('.chart-container').innerHTML = `
                <div class="chart-placeholder">
                    <i class="fas fa-chart-line" style="font-size: 30px; color: #6c757d; margin-bottom: 8px;"></i>
                    <p>Select parameters and click "Generate Report" to view statistics</p>
                </div>
            `;
        }
        
        // Generate Report
        function generateReport() {
            const reportType = document.getElementById('reportType').value;
            const reportMonth = document.getElementById('reportMonth').value;
            const reportYear = document.getElementById('reportYear').value;
            const reportBloodType = document.getElementById('reportBloodType').value;
            
            if (!reportType) {
                showError('Please select a report type');
                return;
            }
            
            // Show loading
            showLoading();
            
            // Simulate API call
            setTimeout(() => {
                hideLoading();
                
                // Create a simple chart representation
                const chartContainer = document.querySelector('.chart-container');
                chartContainer.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 15px;">
                        <h3 style="font-size: 18px; color: var(--text-dark);">Donation Statistics</h3>
                        <div style="width: 95%; height: 180px; background-color: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center; position: relative;">
                            <div style="width: 95%; height: 80%; display: flex; align-items: flex-end; justify-content: space-around;">
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                                    <div style="width: 25px; height: 100px; background-color: var(--primary-color); border-radius: 4px;"></div>
                                    <span style="font-size: 10px; color: var(--text-dark);">Jan</span>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                                    <div style="width: 25px; height: 70px; background-color: var(--primary-color); border-radius: 4px;"></div>
                                    <span style="font-size: 10px; color: var(--text-dark);">Feb</span>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                                    <div style="width: 25px; height: 120px; background-color: var(--primary-color); border-radius: 4px;"></div>
                                    <span style="font-size: 10px; color: var(--text-dark);">Mar</span>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                                    <div style="width: 25px; height: 90px; background-color: var(--primary-color); border-radius: 4px;"></div>
                                    <span style="font-size: 10px; color: var(--text-dark);">Apr</span>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                                    <div style="width: 25px; height: 140px; background-color: var(--primary-color); border-radius: 4px;"></div>
                                    <span style="font-size: 10px; color: var(--text-dark);">May</span>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 20px; font-size: 12px; color: var(--text-dark); flex-wrap: wrap; justify-content: center;">
                            <div>Total Donors: <strong>15</strong></div>
                            <div>Avg/Month: <strong>3</strong></div>
                            <div>Most Common: <strong>B+</strong></div>
                        </div>
                    </div>
                `;
                
                showSuccess('Report generated successfully!');
            }, 1500);
        }
        
        // Update Password Strength
        function updatePasswordStrength() {
            const password = document.getElementById('newPassword').value;
            const strengthFill = document.getElementById('strengthFill');
            const strength = getPasswordStrength(password);
            
            // Update strength bar
            strengthFill.style.width = `${strength * 33.33}%`;
            
            // Update color based on strength
            if (strength === 0) {
                strengthFill.className = 'strength-fill';
            } else if (strength === 1) {
                strengthFill.className = 'strength-fill strength-weak';
            } else if (strength === 2) {
                strengthFill.className = 'strength-fill strength-medium';
            } else if (strength === 3) {
                strengthFill.className = 'strength-fill strength-strong';
            }
        }
        
        // Update Reset Password Strength
        function updateResetPasswordStrength() {
            const password = document.getElementById('newResetPassword').value;
            const strengthFill = document.getElementById('resetStrengthFill');
            const strength = getPasswordStrength(password);
            
            // Update strength bar
            strengthFill.style.width = `${strength * 33.33}%`;
            
            // Update color based on strength
            if (strength === 0) {
                strengthFill.className = 'strength-fill';
            } else if (strength === 1) {
                strengthFill.className = 'strength-fill strength-weak';
            } else if (strength === 2) {
                strengthFill.className = 'strength-fill strength-medium';
            } else if (strength === 3) {
                strengthFill.className = 'strength-fill strength-strong';
            }
        }
        
        // Get Password Strength (0-3)
        function getPasswordStrength(password) {
            if (!password) return 0;
            
            let strength = 0;
            
            // Check length
            if (password.length >= 8) strength++;
            
            // Check for uppercase letters
            if (/[A-Z]/.test(password)) strength++;
            
            // Check for numbers
            if (/\d/.test(password)) strength++;
            
            // Check for special characters
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
            
            // Cap at 3
            return Math.min(strength, 3);
        }
        
        // Move to Next Input in Verification Code
        function moveToNext(input, index) {
            if (input.value.length === 1) {
                const nextInput = document.querySelectorAll('.code-input')[index];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
        
        // Show Profile Page
        function showProfilePage() {
            setActivePage('profile');
            loadProfile(); // Load profile data when opening
        }
        
        // Show Loading Spinner
        function showLoading() {
            loadingSpinner.style.display = 'flex';
        }
        
        // Hide Loading Spinner
        function hideLoading() {
            loadingSpinner.style.display = 'none';
        }
        
        // Show Success Message
        function showSuccess(message) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
        
        // Show Error Message
        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }