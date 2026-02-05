// ========== NAVBAR ACTIVE LINK ==========
// Deteksi halaman aktif dan tambahkan class active ke menu yang sesuai
document.addEventListener('DOMContentLoaded', function() {
    // Ambil nama file halaman saat ini
    const currentPage = window.location.pathname.split('/').pop();
    
    // Jika halaman kosong atau index, set ke index.html
    const pageName = currentPage || 'index.html';
    
    // Dapatkan semua link navbar
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Loop melalui semua link
    navLinks.forEach(link => {
        // Hapus semua class active dulu
        link.classList.remove('active');
        
        // Ambil href dari link
        const linkHref = link.getAttribute('href');
        
        // Jika link href sama dengan halaman saat ini
        if (pageName === linkHref) {
            link.classList.add('active');
        }
        
        // Jika di halaman index dan link adalah index.html
        // Ini untuk handle kasus ketika URL berakhir dengan '/' atau kosong
        if ((pageName === '' || pageName === '/') && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // ========== LOGO LIGHTBOX FUNCTIONALITY ==========
    // Logo lightbox functionality
    const logoClick = document.querySelector('#logoClick');
    const logoLightbox = document.getElementById('logoLightbox');
    const closeLightbox = document.getElementById('closeLightbox');
    const closeLightboxBtn = document.getElementById('closeLightboxBtn');
    
    if (logoClick && logoLightbox) {
        // Buka lightbox saat logo diklik
        logoClick.addEventListener('click', function(e) {
            e.preventDefault();
            logoLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Tutup lightbox saat tombol close diklik
        if (closeLightbox) {
            closeLightbox.addEventListener('click', function() {
                logoLightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        if (closeLightboxBtn) {
            closeLightboxBtn.addEventListener('click', function() {
                logoLightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Tutup lightbox saat klik di luar konten
        logoLightbox.addEventListener('click', function(e) {
            if (e.target === logoLightbox) {
                logoLightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Tutup lightbox dengan tombol ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && logoLightbox.classList.contains('active')) {
                logoLightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ========== LIGHTBOX FOTO PENGURUS ==========
    const pengurusLightbox = document.getElementById('pengurusLightbox');
    const closePengurusLightbox = document.getElementById('closePengurusLightbox');
    const lightboxPhoto = document.getElementById('lightboxPhoto');
    const lightboxName = document.getElementById('lightboxName');
    const lightboxJabatan = document.getElementById('lightboxJabatan');
    const lightboxDivisi = document.getElementById('lightboxDivisi');
    const lightboxInstagram = document.getElementById('lightboxInstagram');
    
    // Fungsi untuk membuka lightbox pengurus
    function openPengurusLightbox(data) {
        if (!data) return;
        
        // Set data ke lightbox
        lightboxPhoto.src = data.photo;
        lightboxPhoto.alt = data.name;
        lightboxName.textContent = data.name;
        lightboxJabatan.textContent = data.jabatan;
        lightboxDivisi.textContent = data.divisi;
        
        // Set link instagram jika ada
        if (data.instagram && data.instagram !== '#') {
            lightboxInstagram.href = data.instagram;
            lightboxInstagram.style.display = 'inline-flex';
        } else {
            lightboxInstagram.style.display = 'none';
        }
        
        // Tampilkan lightbox
        pengurusLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Event listener untuk semua foto pengurus
    document.addEventListener('click', function(e) {
        // Cek jika yang diklik adalah photo-placeholder 
        // Tapi bukan logo header/footer
        if (e.target.closest('.photo-placeholder') && 
            !e.target.closest('.logo') && 
            !e.target.closest('.footer-logo')) {
            
            const photoPlaceholder = e.target.closest('.photo-placeholder');
            
            // Cari elemen terdekat yang memiliki data attributes
            let element = photoPlaceholder.closest('.pengurus-item') || 
                         photoPlaceholder.closest('.anggota-slide') || 
                         photoPlaceholder.closest('.pengurus-card') ||
                         photoPlaceholder.closest('.sambutan-img .photo-placeholder');
            
            if (element) {
                const data = {
                    name: element.getAttribute('data-name') || 'Nama tidak tersedia',
                    jabatan: element.getAttribute('data-jabatan') || element.getAttribute('data-role') || 'Jabatan tidak tersedia',
                    divisi: element.getAttribute('data-divisi') || 'Divisi tidak tersedia',
                    photo: element.getAttribute('data-photo') || element.querySelector('img')?.src || 'pp.jpeg',
                    instagram: element.getAttribute('data-instagram') || '#'
                };
                
                openPengurusLightbox(data);
            }
        }
    });
    
    // Event listener untuk tombol close lightbox pengurus
    if (closePengurusLightbox) {
        closePengurusLightbox.addEventListener('click', function() {
            pengurusLightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Event listener untuk klik di luar lightbox pengurus
    if (pengurusLightbox) {
        pengurusLightbox.addEventListener('click', function(e) {
            if (e.target === pengurusLightbox) {
                pengurusLightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Event listener untuk ESC key pada lightbox pengurus
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && pengurusLightbox.classList.contains('active')) {
            pengurusLightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ========== SLIDER SAMBUTAN DENGAN FOTO (SELALU 1.2.3.1.2.3 TANPA KESALAHAN) ==========
    if (document.querySelector('.sambutan-slider-item')) {
        initSambutanSliderWithPhoto();
    }
    
    // ========== SETUP TOMBOL INSTAGRAM ==========
    setupInstagramLinks();
    
    // ========== ANGGOTA SLIDER FUNCTION (INFINITE LOOP) - DIPERBAIKI DENGAN AUTO-SLIDE & REWIND ==========
    initAnggotaSlidersWithAutoSlideAndRewind();
    
    // ========== GANTI ICON PROGRAM KERJA ==========
    updateProgramIcons();
    
    // ========== NONAKTIFKAN FUNGSI MODAL LAMA UNTUK HALAMAN GALERI ==========
    // Cek apakah sedang di halaman galeri.html
    if (currentPage !== 'galeri.html') {
        initGaleriModals();
        initBeritaModals();
    }
});

// ========== SLIDER SAMBUTAN DENGAN FOTO (SELALU 1.2.3.1.2.3 TANPA KESALAHAN) ==========
function initSambutanSliderWithPhoto() {
    const sliderItems = document.querySelectorAll('.sambutan-slider-item');
    const sliderDots = document.querySelectorAll('.sambutan-slider-dot');
    const sambutanPhoto = document.querySelector('.sambutan-img .photo-placeholder');
    const sambutanName = document.getElementById('sambutanName');
    const sambutanRole = document.getElementById('sambutanRole');
    
    if (sliderItems.length === 0 || !sambutanPhoto) return;
    
    let currentSlideIndex = 0;
    let isAnimating = false;
    const slideDuration = 8000; // 8 detik
    const totalSlides = sliderItems.length;
    
    // FUNGSI: Pindah ke slide tertentu
    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Hentikan semua slide
        sliderItems.forEach(item => {
            item.classList.remove('active');
            item.style.opacity = '0';
            item.style.transform = 'translateX(30px)';
        });
        
        // Nonaktifkan semua dots
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        // Aktifkan slide baru
        sliderItems[index].classList.add('active');
        sliderDots[index].classList.add('active');
        
        // Update foto dan info
        updatePhotoAndInfo(index);
        
        currentSlideIndex = index;
        
        // Reset animating flag
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }
    
    // FUNGSI: Update foto dan info
    function updatePhotoAndInfo(index) {
        const currentSlideData = sliderItems[index];
        const photo = currentSlideData.getAttribute('data-photo');
        const name = currentSlideData.getAttribute('data-name');
        const role = currentSlideData.getAttribute('data-role');
        
        // Animasi fade out
        sambutanPhoto.style.opacity = '0.5';
        sambutanPhoto.style.transform = 'scale(0.95)';
        if (sambutanName) sambutanName.style.opacity = '0.5';
        if (sambutanRole) sambutanRole.style.opacity = '0.5';
        
        setTimeout(() => {
            // Update data
            if (sambutanPhoto) {
                sambutanPhoto.setAttribute('data-photo', photo);
                sambutanPhoto.setAttribute('data-name', name);
                sambutanPhoto.setAttribute('data-jabatan', role);
                sambutanPhoto.setAttribute('data-divisi', 'KETUA OSIS');
                
                const img = sambutanPhoto.querySelector('img');
                if (img) {
                    img.src = photo;
                    img.alt = name;
                }
            }
            
            if (sambutanName) sambutanName.textContent = name;
            if (sambutanRole) sambutanRole.textContent = role;
            
            // Animasi fade in
            sambutanPhoto.style.opacity = '1';
            sambutanPhoto.style.transform = 'scale(1)';
            if (sambutanName) sambutanName.style.opacity = '1';
            if (sambutanRole) sambutanRole.style.opacity = '1';
        }, 300);
    }
    
    // FUNGSI: Slide berikutnya (SELALU 1→2→3→1→2→3)
    function goToNextSlide() {
        let nextIndex = currentSlideIndex + 1;
        
        // Jika sudah di slide 3, kembali ke slide 1
        if (nextIndex >= totalSlides) {
            nextIndex = 0; // SELALU KEMBALI KE SLIDE 1
        }
        
        goToSlide(nextIndex);
    }
    
    // FUNGSI: Inisialisasi slide pertama
    function initializeFirstSlide() {
        if (sliderItems.length > 0) {
            const firstSlide = sliderItems[0];
            const photo = firstSlide.getAttribute('data-photo');
            const name = firstSlide.getAttribute('data-name');
            const role = firstSlide.getAttribute('data-role');
            
            // Set data awal
            if (sambutanPhoto) {
                sambutanPhoto.setAttribute('data-photo', photo);
                sambutanPhoto.setAttribute('data-name', name);
                sambutanPhoto.setAttribute('data-jabatan', role);
                sambutanPhoto.setAttribute('data-divisi', 'KETUA OSIS');
                
                const img = sambutanPhoto.querySelector('img');
                if (img) {
                    img.src = photo;
                    img.alt = name;
                }
            }
            
            if (sambutanName) sambutanName.textContent = name;
            if (sambutanRole) sambutanRole.textContent = role;
            
            // Aktifkan slide pertama
            sliderItems[0].classList.add('active');
            sliderDots[0].classList.add('active');
        }
    }
    
    // FUNGSI: Mulai auto slide
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            goToNextSlide();
        }, slideDuration);
    }
    
    let slideInterval = null;
    
    // Jalankan inisialisasi
    initializeFirstSlide();
    
    // Mulai auto slide
    startAutoSlide();
    
    // Event listener untuk dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            if (isAnimating) return;
            
            // Stop timer lama
            clearInterval(slideInterval);
            
            // Pindah ke slide yang dipilih
            goToSlide(index);
            
            // Restart timer
            startAutoSlide();
        });
    });
    
    // Pause saat hover
    const sliderWrapper = document.querySelector('.sambutan-slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', () => {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        });
        
        sliderWrapper.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Reset saat halaman difokuskan kembali
    window.addEventListener('focus', () => {
        if (!slideInterval) {
            startAutoSlide();
        }
    });
}

// ========== ANGGOTA SLIDER FUNCTION - VERSI BARU DENGAN AUTO-SLIDE & REWIND KE AWAL ==========
function initAnggotaSlidersWithAutoSlideAndRewind() {
    const bidangIds = ['humas', 'olahraga', 'agama', 'media'];
    
    bidangIds.forEach(bidangId => {
        const sliderTrack = document.getElementById(`${bidangId}Slider`);
        if (!sliderTrack) return;
        
        // Setup variables untuk auto-slide
        let autoSlideInterval = null;
        const autoSlideDuration = 3000; // 3 detik untuk auto-slide
        
        // Setup variables untuk slider
        let currentIndex = 0;
        let isAnimating = false;
        const slideDuration = 1200; // Durasi animasi slide
        
        // Ambil semua slide original
        const slides = sliderTrack.querySelectorAll('.anggota-slide');
        const totalSlides = slides.length;
        
        if (totalSlides === 0) return;
        
        // Clone slides untuk infinite effect
        // Clone pertama
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            sliderTrack.appendChild(clone);
        });
        
        // Clone kedua (untuk smooth infinite)
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            sliderTrack.appendChild(clone);
        });
        
        // Update setelah cloning
        const allSlides = sliderTrack.querySelectorAll('.anggota-slide');
        const totalAllSlides = allSlides.length;
        
        // Set initial position (mulai dari set pertama)
        const slideWidth = 180 + 20; // 180px + 20px gap
        sliderTrack.style.transform = `translateX(0px)`;
        
        // Function untuk restart dari awal dengan animasi khusus
        function restartFromBeginning() {
            if (isAnimating) return;
            isAnimating = true;
            
            // Animasi fade out untuk efek smooth
            sliderTrack.style.transition = 'opacity 0.6s ease';
            sliderTrack.style.opacity = '0.5';
            
            setTimeout(() => {
                // Kembali ke posisi awal tanpa animasi
                sliderTrack.style.transition = 'none';
                sliderTrack.style.opacity = '1';
                currentIndex = 0;
                sliderTrack.style.transform = `translateX(0px)`;
                
                // Force reflow
                void sliderTrack.offsetWidth;
                
                // Kembalikan transisi untuk slide berikutnya
                sliderTrack.style.transition = `transform ${slideDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                
                isAnimating = false;
                
                // Mulai auto slide lagi
                if (!autoSlideInterval) {
                    startAutoSlide();
                }
            }, 600);
        }
        
        // Function untuk slide ke kiri (prev)
        function slidePrev() {
            if (isAnimating) return;
            isAnimating = true;
            
            currentIndex--;
            
            // Jika sudah melewati batas awal, restart dari akhir dengan animasi khusus
            if (currentIndex < 0) {
                // Animasi khusus untuk restart dari akhir
                sliderTrack.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
                sliderTrack.style.transform = `translateX(${100}px)`;
                sliderTrack.style.opacity = '0.3';
                
                setTimeout(() => {
                    // Kembali ke posisi akhir tanpa animasi
                    sliderTrack.style.transition = 'none';
                    sliderTrack.style.opacity = '1';
                    currentIndex = totalSlides - 1;
                    sliderTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
                    
                    // Force reflow
                    void sliderTrack.offsetWidth;
                    
                    // Kembalikan transisi
                    sliderTrack.style.transition = `transform ${slideDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                    isAnimating = false;
                }, 800);
            } else {
                // Gunakan transisi normal
                sliderTrack.style.transition = `transform ${slideDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                
                // Animasikan ke posisi baru
                sliderTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
                
                // Reset animating flag setelah animasi selesai
                setTimeout(() => {
                    isAnimating = false;
                }, slideDuration);
            }
        }
        
        // Function untuk slide ke kanan (next)
        function slideNext() {
            if (isAnimating) return;
            isAnimating = true;
            
            currentIndex++;
            
            // Jika sudah melewati set kedua (setelah clone), restart dari awal dengan animasi smooth
            if (currentIndex >= totalSlides * 2) {
                // Animasi khusus untuk restart
                sliderTrack.style.transition = 'transform 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.8s ease-out';
                sliderTrack.style.transform = `translateX(${-(totalSlides * 2) * slideWidth + 100}px)`;
                sliderTrack.style.opacity = '0.3';
                
                setTimeout(() => {
                    // Kembali ke posisi awal tanpa animasi
                    sliderTrack.style.transition = 'none';
                    sliderTrack.style.opacity = '1';
                    currentIndex = 0;
                    sliderTrack.style.transform = `translateX(0px)`;
                    
                    // Force reflow
                    void sliderTrack.offsetWidth;
                    
                    // Kembalikan transisi untuk slide berikutnya
                    sliderTrack.style.transition = `transform ${slideDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                    isAnimating = false;
                }, 1200);
            } else {
                // Gunakan transisi normal
                sliderTrack.style.transition = `transform ${slideDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                
                // Animasikan ke posisi baru
                sliderTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
                
                // Reset animating flag setelah animasi selesai
                setTimeout(() => {
                    isAnimating = false;
                }, slideDuration);
            }
        }
        
        // Function untuk memulai auto slide
        function startAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
            
            autoSlideInterval = setInterval(() => {
                slideNext();
            }, autoSlideDuration);
        }
        
        // Mulai auto slide
        startAutoSlide();
        
        // Add event listeners for navigation buttons
        const prevBtn = document.getElementById(`${bidangId}Prev`);
        const nextBtn = document.getElementById(`${bidangId}Next`);
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Reset timer ketika tombol diklik
                if (autoSlideInterval) {
                    clearInterval(autoSlideInterval);
                    startAutoSlide();
                }
                slidePrev();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Reset timer ketika tombol diklik
                if (autoSlideInterval) {
                    clearInterval(autoSlideInterval);
                    startAutoSlide();
                }
                slideNext();
            });
        }
        
        // Pause auto slide saat hover
        const sliderContainer = sliderTrack.closest('.anggota-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                if (autoSlideInterval) {
                    clearInterval(autoSlideInterval);
                    autoSlideInterval = null;
                }
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                if (!autoSlideInterval) {
                    startAutoSlide();
                }
            });
        }
        
        // Reset auto slide saat halaman difokuskan kembali
        window.addEventListener('focus', () => {
            if (!autoSlideInterval) {
                startAutoSlide();
            }
        });
        
        // Touch support untuk mobile
        let touchStartX = 0;
        let touchEndX = 0;
        let isTouching = false;
        
        sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            isTouching = true;
            
            // Pause auto slide saat touch
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }, { passive: true });
        
        sliderTrack.addEventListener('touchmove', (e) => {
            if (!isTouching) return;
            touchEndX = e.touches[0].clientX;
        }, { passive: true });
        
        sliderTrack.addEventListener('touchend', (e) => {
            if (!isTouching) return;
            isTouching = false;
            
            const diff = touchStartX - touchEndX;
            const swipeThreshold = 50;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe kiri -> next
                    slideNext();
                } else {
                    // Swipe kanan -> prev
                    slidePrev();
                }
            }
            
            // Restart auto slide setelah touch
            if (!autoSlideInterval) {
                startAutoSlide();
            }
        }, { passive: true });
        
        // Mouse drag support untuk desktop
        let mouseStartX = 0;
        let isDragging = false;
        
        sliderTrack.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isDragging = true;
            sliderTrack.style.cursor = 'grabbing';
            
            // Pause auto slide saat drag
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        });
        
        sliderTrack.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        sliderTrack.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const mouseEndX = e.clientX;
            const diff = mouseStartX - mouseEndX;
            const dragThreshold = 50;
            
            if (Math.abs(diff) > dragThreshold) {
                if (diff > 0) {
                    // Drag kiri -> next
                    slideNext();
                } else {
                    // Drag kanan -> prev
                    slidePrev();
                }
            }
            
            sliderTrack.style.cursor = 'grab';
            
            // Restart auto slide setelah drag
            if (!autoSlideInterval) {
                startAutoSlide();
            }
        });
        
        sliderTrack.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                sliderTrack.style.cursor = 'grab';
                
                // Restart auto slide
                if (!autoSlideInterval) {
                    startAutoSlide();
                }
            }
        });
        
        // Set cursor awal
        sliderTrack.style.cursor = 'grab';
    });
}

// ========== SETUP TOMBOL INSTAGRAM ==========
function setupInstagramLinks() {
    // Setup untuk halaman index.html - pengurus card
    document.querySelectorAll('.pengurus-card').forEach(card => {
        const instagramLink = card.getAttribute('data-instagram');
        if (instagramLink && instagramLink !== '#') {
            // Cari atau buat tombol instagram
            let instagramBtn = card.querySelector('.instagram-link');
            if (!instagramBtn) {
                // Cari atau buat container untuk tombol
                let kontakDiv = card.querySelector('.kontak');
                if (!kontakDiv) {
                    const quoteElement = card.querySelector('.quote');
                    if (quoteElement) {
                        kontakDiv = document.createElement('div');
                        kontakDiv.className = 'kontak';
                        quoteElement.parentNode.insertBefore(kontakDiv, quoteElement.nextSibling);
                    }
                }
                
                if (kontakDiv) {
                    instagramBtn = document.createElement('a');
                    instagramBtn.className = 'instagram-link';
                    instagramBtn.innerHTML = '<i class="fab fa-instagram"></i> Instagram';
                    instagramBtn.href = instagramLink;
                    instagramBtn.target = '_blank';
                    kontakDiv.appendChild(instagramBtn);
                }
            } else {
                // Update link jika tombol sudah ada
                instagramBtn.href = instagramLink;
                instagramBtn.target = '_blank';
            }
        }
    });
    
    // Setup untuk halaman pengurus.html - pengurus item
    document.querySelectorAll('.pengurus-item, .anggota-slide').forEach(item => {
        const instagramLink = item.getAttribute('data-instagram');
        if (instagramLink && instagramLink !== '#') {
            // Cari div kontak atau buat baru
            let kontakDiv = item.querySelector('.kontak');
            if (!kontakDiv) {
                kontakDiv = document.createElement('div');
                kontakDiv.className = 'kontak';
                
                // Tempatkan di posisi yang tepat
                const infoDiv = item.querySelector('.pengurus-info') || item.querySelector('h5') || item;
                if (infoDiv.nextSibling) {
                    infoDiv.parentNode.insertBefore(kontakDiv, infoDiv.nextSibling);
                } else {
                    infoDiv.parentNode.appendChild(kontakDiv);
                }
            }
            
            // Hapus tombol instagram lama jika ada
            const oldBtn = kontakDiv.querySelector('.instagram-link');
            if (oldBtn) oldBtn.remove();
            
            // Buat tombol instagram baru
            const instagramBtn = document.createElement('a');
            instagramBtn.className = 'instagram-link';
            instagramBtn.innerHTML = '<i class="fab fa-instagram"></i> Instagram';
            instagramBtn.href = instagramLink;
            instagramBtn.target = '_blank';
            
            kontakDiv.appendChild(instagramBtn);
        }
    });
}

// ========== GANTI ICON PROGRAM KERJA ==========
function updateProgramIcons() {
    const programIcons = document.querySelectorAll('.program-icon i');
    
    programIcons.forEach(icon => {
        // Bidang Humas
        if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Kolaborasi dengan Divisi Lain')) {
            icon.className = 'fas fa-handshake';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Humas')) {
            icon.className = 'fas fa-users';
        }
        
        // Bidang Olahraga
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Olahraga')) {
            icon.className = 'fas fa-running';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Car Free Day')) {
            icon.className = 'fas fa-bicycle';
        }
        
        // Bidang Agama
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Agama')) {
            icon.className = 'fas fa-pray';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Shalawat')) {
            icon.className = 'fas fa-hands-praying';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Lomba')) {
            icon.className = 'fas fa-award';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Berbagi')) {
            icon.className = 'fas fa-hand-holding-heart';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Event')) {
            icon.className = 'fas fa-calendar-star';
        }
        
        // Bidang Media Kreatif
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Media')) {
            icon.className = 'fas fa-camera';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Workshop')) {
            icon.className = 'fas fa-paint-brush';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Konten')) {
            icon.className = 'fas fa-video';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Desain')) {
            icon.className = 'fas fa-palette';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Dokumentasi')) {
            icon.className = 'fas fa-photo-video';
        }
        else if (icon.closest('.program-card')?.querySelector('h3')?.textContent.includes('Produksi')) {
            icon.className = 'fas fa-film';
        }
    });
}

// ========== GALERI MODAL FIX - HANYA UNTUK HALAMAN LAIN BUKAN GALERI.HTML ==========
function initGaleriModals() {
    // Hanya jalankan jika tidak di halaman galeri.html
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'galeri.html') return;
    
    const galeriButtons = document.querySelectorAll('.btn-galery');
    
    galeriButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hapus modal lama jika ada
            const oldModal = document.querySelector('.modal-overlay');
            if (oldModal) {
                oldModal.remove();
            }
            
            // Get data dari card
            const card = this.closest('.galeri-item');
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const date = card.querySelector('.galeri-date').textContent;
            
            // Buat modal baru
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="close-modal"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-gallery">
                            <div class="modal-gallery-item">
                                <input type="file" id="fileUpload1" accept="image/*" style="display: none;">
                                <label for="fileUpload1" class="upload-label">
                                    <i class="fas fa-plus"></i>
                                    <span>Klik untuk upload foto</span>
                                </label>
                                <img id="preview1" src="" alt="" style="display: none;">
                            </div>
                            <div class="modal-gallery-item">
                                <input type="file" id="fileUpload2" accept="image/*" style="display: none;">
                                <label for="fileUpload2" class="upload-label">
                                    <i class="fas fa-plus"></i>
                                    <span>Klik untuk upload foto</span>
                                </label>
                                <img id="preview2" src="" alt="" style="display: none;">
                            </div>
                            <div class="modal-gallery-item">
                                <input type="file" id="fileUpload3" accept="image/*" style="display: none;">
                                <label for="fileUpload3" class="upload-label">
                                    <i class="fas fa-plus"></i>
                                    <span>Klik untuk upload foto</span>
                                </label>
                                <img id="preview3" src="" alt="" style="display: none;">
                            </div>
                            <div class="modal-gallery-item">
                                <input type="file" id="fileUpload4" accept="image/*" style="display: none;">
                                <label for="fileUpload4" class="upload-label">
                                    <i class="fas fa-plus"></i>
                                    <span>Klik untuk upload foto</span>
                                </label>
                                <img id="preview4" src="" alt="" style="display: none;">
                            </div>
                        </div>
                        
                        <div class="modal-info">
                            <p><strong>Tanggal:</strong> ${date}</p>
                            <p>${description}</p>
                            <div class="modal-actions">
                                <button class="btn-save">
                                    <i class="fas fa-save"></i> Simpan Foto
                                </button>
                                <button class="btn-close-modal">
                                    <i class="fas fa-times"></i> Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Add active class after a delay
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Setup event listeners untuk modal baru
            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (modal.parentNode) {
                        document.body.removeChild(modal);
                    }
                    document.body.style.overflow = 'auto';
                }, 300);
            };
            
            // Close button
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            modal.querySelector('.btn-close-modal').addEventListener('click', closeModal);
            
            // Click outside to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Setup file upload
            setupFileUpload();
        });
    });
    
    function setupFileUpload() {
        // Setup file upload untuk semua input
        const fileInputs = document.querySelectorAll('input[type="file"]');
        
        fileInputs.forEach((input, index) => {
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const previewId = `preview${index + 1}`;
                        const preview = document.getElementById(previewId);
                        const label = this.closest('.modal-gallery-item').querySelector('.upload-label');
                        
                        if (preview) {
                            preview.src = e.target.result;
                            preview.style.display = 'block';
                            if (label) label.style.display = 'none';
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }
}

// ========== BERITA MODAL FIX - HANYA UNTUK HALAMAN LAIN BUKAN GALERI.HTML ==========
function initBeritaModals() {
    // Hanya jalankan jika tidak di halaman galeri.html
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'galeri.html') return;
    
    // Fix untuk modal berita (single close)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-berita')) {
            e.preventDefault();
            
            const button = e.target.closest('.btn-berita');
            const newsId = button.getAttribute('data-news');
            const title = button.closest('.berita-card').querySelector('h3').textContent;
            
            // Hapus modal lama jika ada
            const oldModal = document.querySelector('.modal-overlay');
            if (oldModal) {
                oldModal.remove();
            }
            
            const newsData = {
                'recruitment': `
                    <p><strong>Tanggal:</strong> 5 Januari 2026</p>
                    <p>Pendaftaran anggota OSIS baru telah dibuka untuk siswa kelas X dan XI. Persyaratan pendaftaran:</p>
                    <ul>
                        <li>Siswa aktif SMK Tritech Informatika</li>
                        <li>Memiliki nilai akademik minimal 75</li>
                        <li>Memiliki motivasi untuk berkontribusi</li>
                        <li>Tidak memiliki catatan pelanggaran berat</li>
                    </ul>
                    <p>Pendaftaran hingga 15 Januari 2026 melalui website OSIS.</p>
                `,
                'prestasi': `
                    <p><strong>Tanggal:</strong> 20 Desember 2025</p>
                    <p>Tim coding OSIS berhasil meraih juara 2 dalam kompetisi coding tingkat kota yang diadakan oleh Dinas Pendidikan.</p>
                    <p>Tim terdiri dari 3 siswa berhasil membuat aplikasi "E-Learning Helper" yang membantu proses pembelajaran daring.</p>
                    <p>Prestasi ini merupakan kebanggaan bagi sekolah dan OSIS.</p>
                `
            };
            
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="close-modal"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        ${newsData[newsId] || '<p>Konten tidak tersedia.</p>'}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Add active class after a delay
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Setup close event - SINGLE CLOSE
            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (modal.parentNode) {
                        document.body.removeChild(modal);
                    }
                    document.body.style.overflow = 'auto';
                }, 300);
            };
            
            // Close button
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            
            // Click outside to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
    });
}

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuToggle.innerHTML = navbar.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbar && navbar.classList.contains('active') && 
        !navbar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        navbar.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuToggle.innerHTML = '<i class=\'fas fa-bars\'></i>';
            }
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value) {
            alert('Terima kasih! Anda telah berlangganan newsletter OSIS.');
            emailInput.value = '';
        }
    });
}

// Current year for footer
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = currentYear;
});