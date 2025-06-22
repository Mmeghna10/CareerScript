/* eslint-disable no-undef */
import moment from 'moment';
import html2canvas from 'html2canvas'

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Enhanced version with better URL validation and error handling
export const getLightColorFromImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
        // Enhanced URL validation
        if (!imageUrl || typeof imageUrl !== 'string') {
            console.warn('Invalid image URL provided:', imageUrl);
            return resolve('#ffffff'); // Return default instead of rejecting
        }

        // Check if URL is properly formatted
        if (!imageUrl.startsWith('data:') && !isValidUrl(imageUrl)) {
            console.warn('Malformed URL detected:', imageUrl);
            return resolve('#ffffff');
        }

        const img = new Image();

        // Set CORS for external images
        if (!imageUrl.startsWith('data:') && !imageUrl.includes(window.location.hostname)) {
            img.crossOrigin = 'anonymous';
        }

        // Add timeout to prevent hanging
        const timeout = setTimeout(() => {
            console.warn('Image loading timeout for:', imageUrl);
            reject(new Error('Image loading timeout'));
        }, 10000); // 10 second timeout

        img.onload = () => {
            clearTimeout(timeout);
            
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

                let r = 0, g = 0, b = 0, count = 0;

                for (let i = 0; i < imageData.length; i += 4) {
                    const red = imageData[i];
                    const green = imageData[i + 1];
                    const blue = imageData[i + 2];
                    const brightness = (red + green + blue) / 3;

                    if (brightness > 180) {
                        r += red;
                        g += green;
                        b += blue;
                        count++;
                    }
                }

                if (count === 0) {
                    resolve('#ffffff');
                } else {
                    r = Math.round(r / count);
                    g = Math.round(g / count);
                    b = Math.round(b / count);
                    resolve(`rgb(${r}, ${g}, ${b})`);
                }
            } catch (error) {
                console.error('Canvas processing error:', error);
                resolve('#ffffff');
            }
        };

        img.onerror = (e) => {
            clearTimeout(timeout);
            console.error('Failed to load image:', imageUrl, e);
            // Return default color instead of rejecting
            resolve('#ffffff');
        };

        img.src = imageUrl;
    });
};

// Helper function to validate URLs
export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Enhanced image URL sanitizer
export const sanitizeImageUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    
    // Handle localhost URLs in development
    if (url.includes('localhost') && !url.startsWith('http')) {
        return `http://${url}`;
    }
    
    // Ensure HTTPS for external URLs
    if (url.startsWith('http://') && !url.includes('localhost')) {
        return url.replace('http://', 'https://');
    }
    
    // Return as-is if it's already a valid URL or data URL
    return url;
};

// Format date - Example: Mar 2025
export function formatYearMonth(yearMonth) {
    return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : "";
}

export const fixTailwindColors = (element) => {
    const elements = element.querySelectorAll("*");

    elements.forEach((el) => {
        const style = window.getComputedStyle(el);

        ["color", "backgroundColor", "borderColor"].forEach((prop) => {
            const value = style[prop];
            if (value.includes("oklch")) {
                el.style[prop] = "#000";
            }
        });
    });
};

// Enhanced image capture with better error handling
export async function captureElementAsImage(element, options = {}) {
    if (!element) throw new Error("No element provided");

    try {
        // Fix Tailwind colors before capturing
        fixTailwindColors(element);
        
        const defaultOptions = {
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#ffffff',
            scale: 1,
            ...options
        };

        const canvas = await html2canvas(element, defaultOptions);
        return canvas.toDataURL("image/png");
    } catch (error) {
        console.error('Error capturing element as image:', error);
        throw new Error(`Failed to capture image: ${error.message}`);
    }
}

// Utility to convert base64 data url to file object
export const dataURLtoFile = (dataUrl, fileName) => {
    try {
        const arr = dataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], fileName, { type: mime });
    } catch (error) {
        console.error('Error converting data URL to file:', error);
        throw new Error('Failed to convert data URL to file');
    }
}

// Helper function for safe image loading with fallback
export const loadImageWithFallback = (primaryUrl, fallbackUrl = '/default-avatar.png') => {
    return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => resolve(primaryUrl);
        img.onerror = () => {
            console.warn('Primary image failed, trying fallback:', primaryUrl);
            const fallbackImg = new Image();
            
            fallbackImg.onload = () => resolve(fallbackUrl);
            fallbackImg.onerror = () => {
                console.error('Fallback image also failed:', fallbackUrl);
                resolve('/placeholder.svg'); // Final fallback
            };
            
            fallbackImg.src = fallbackUrl;
        };
        
        img.src = sanitizeImageUrl(primaryUrl) || fallbackUrl;
    });
};

// Debug utility to check image URLs
export const debugImageUrl = (url, context = '') => {
    console.group(`🖼️ Image URL Debug ${context ? `(${context})` : ''}`);
    console.log('Original URL:', url);
    console.log('Type:', typeof url);
    console.log('Is valid URL:', isValidUrl(url));
    console.log('Sanitized URL:', sanitizeImageUrl(url));
    console.groupEnd();
};