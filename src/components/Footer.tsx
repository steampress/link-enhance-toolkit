
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-semibold">LinkedPro</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              LinkedPro helps professionals optimize their LinkedIn profiles to attract recruiters, build connections, and advance their careers.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="w-8 h-8">
                <span className="sr-only">Twitter</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.23336 4.69629C7.23336 2.96884 8.63335 1.56857 10.36 1.56857C11.3736 1.56857 12.183 2.04804 12.7254 2.74385C13.3079 2.62467 13.8557 2.40913 14.3513 2.11508C14.1559 2.72598 13.7424 3.2396 13.2033 3.56463C13.7219 3.50407 14.2164 3.36584 14.6766 3.16405C14.3519 3.68488 13.9357 4.14393 13.4537 4.51284C13.4592 4.62926 13.462 4.74791 13.462 4.86656C13.462 8.55793 10.5799 12.7845 5.52038 12.7845C3.93083 12.7845 2.45091 12.3066 1.22742 11.4952C1.44374 11.5231 1.66558 11.5371 1.89089 11.5371C3.19919 11.5371 4.40653 11.0746 5.37342 10.3033C4.14662 10.2809 3.0949 9.4363 2.75147 8.31C2.92331 8.3441 3.10021 8.36309 3.28086 8.36309C3.53971 8.36309 3.79059 8.32388 4.0256 8.25171C2.74731 7.9932 1.78168 6.84739 1.78168 5.46758V5.43057C2.14474 5.63012 2.5574 5.74929 2.99496 5.76381C2.22287 5.23937 1.70928 4.34323 1.70928 3.32552C1.70928 2.78609 1.85032 2.28373 2.10205 1.85148C3.46924 3.53833 5.5464 4.65256 7.90872 4.76973C7.8639 4.57245 7.84114 4.36409 7.84114 4.15119C7.84114 2.60845 9.09832 1.35126 10.6414 1.35126C11.4469 1.35126 12.1679 1.70378 12.6675 2.27352C13.2849 2.14757 13.8679 1.9201 14.3964 1.60405C14.1965 2.25008 13.7712 2.78609 13.2153 3.12395C13.7546 3.0579 14.271 2.91306 14.7503 2.70384C14.3992 3.25172 13.9566 3.73372 13.4455 4.1318C13.453 4.25102 13.4565 4.37189 13.4565 4.49307C13.4565 8.17384 10.3298 12.5211 4.88279 12.5211C3.16598 12.5211 1.58192 12.0115 0.25 11.1274C0.487571 11.1545 0.730714 11.168 0.976286 11.168C2.5134 11.168 3.91837 10.6729 5.0312 9.84996C3.7926 9.82154 2.75324 9.00008 2.40411 7.87164C2.59677 7.90479 2.79687 7.92234 3.00196 7.92234C3.29709 7.92234 3.58463 7.88655 3.8576 7.82008C2.56503 7.55567 1.58463 6.39499 1.58463 5.00991V4.97064C1.965 5.18203 2.4007 5.31099 2.86366 5.3258C2.1026 4.7814 1.60874 3.89561 1.60874 2.90078C1.60874 2.35103 1.75732 1.8385 2.01929 1.396C3.47857 3.18799 5.73375 4.37321 8.25634 4.49984C8.20508 4.29199 8.17922 4.07381 8.17922 3.84942C8.17922 2.19007 9.52304 0.846252 11.1824 0.846252C12.0548 0.846252 12.8394 1.2269 13.3842 1.83781C14.0685 1.70188 14.7106 1.45652 15.291 1.12237C15.0775 1.81613 14.6218 2.38587 14.0302 2.75473C14.605 2.68827 15.1544 2.5423 15.6667 2.32274C15.2928 2.90615 14.8194 3.41382 14.2781 3.82282C14.2891 3.98969 14.2945 4.15821 14.2945 4.32673C14.2945 8.48593 11.3947 13.1996 7.07794 13.1996C5.74032 13.1996 4.48728 12.7714 3.41594 12.0238C3.65953 12.0563 3.90856 12.0725 4.16196 12.0725C5.26028 12.0725 6.28367 11.6551 7.12196 10.9398C6.01063 10.9235 5.07899 10.1903 4.75748 9.19093C4.94525 9.22115 5.13949 9.23778 5.33865 9.23778C5.62351 9.23778 5.90033 9.19655 6.16175 9.11986C4.99411 8.88488 4.11996 7.85058 4.11996 6.60645V6.57425C4.45975 6.76241 4.84776 6.87665 5.26027 6.89327C4.55612 6.44068 4.08995 5.66567 4.08995 4.78835C4.08995 4.32673 4.21558 3.89499 4.43747 3.52615C5.68158 5.13855 7.59757 6.21063 9.74562 6.31633C9.7023 6.12816 9.67946 5.93416 9.67946 5.73329C9.67946 4.2642 10.8471 3.0965 12.3162 3.0965C13.0871 3.0965 13.7835 3.41218 14.2671 3.92576C14.8752 3.81153 15.4486 3.60092 15.96 3.31209C15.7465 3.90779 15.3111 4.40229 14.747 4.70073C15.3093 4.64088 15.8481 4.5085 16.3496 4.3127C15.9618 4.81885 15.4862 5.26551 14.9498 5.6284C14.9552 5.73626 14.9579 5.84413 14.9579 5.95201C14.9579 9.35259 12.0629 13.35 8.01108 13.35C6.42152 13.35 4.9416 12.9106 3.71811 12.1626C3.93442 12.1879 4.15626 12.2005 4.38157 12.2005C5.68987 12.2005 6.89721 11.7741 7.86411 11.06C6.6373 11.0393 5.58559 10.2649 5.24215 9.22115C5.414 9.25246 5.5909 9.27 5.77154 9.27C6.03039 9.27 6.28127 9.2343 6.51629 9.16832C5.238 8.93334 4.27238 7.87164 4.27238 6.58625V6.55405C4.63543 6.73637 5.0481 6.84413 5.48566 6.85682C4.71357 6.37613 4.19997 5.55467 4.19997 4.61827C4.19997 4.11591 4.34101 3.64819 4.59274 3.25102C5.95993 4.80437 8.0371 5.8295 10.3994 5.94021C10.3546 5.75848 10.3318 5.56448 10.3318 5.36361C10.3318 3.9255 11.589 2.75473 13.1321 2.75473C13.9376 2.75473 14.6586 3.0796 15.1582 3.60526C15.7756 3.48996 16.3586 3.28123 16.8871 2.99249C16.6873 3.57845 16.2619 4.06918 15.706 4.38203C16.2453 4.32226 16.7617 4.19029 17.241 3.99701C16.8899 4.50266 16.4473 4.95279 15.9362 5.32535C15.9437 5.43393 15.9472 5.54187 15.9472 5.65045C15.9472 9.01329 13.2509 12.9995 8.45782 12.9995C6.88896 12.9995 5.43423 12.5301 4.2 11.7172" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8">
                <span className="sr-only">LinkedIn</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
              <li><a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</a></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn Tips</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Career Resources</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LinkedPro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
