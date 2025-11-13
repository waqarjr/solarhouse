import React from 'react';
import { Shield, Lock, Cookie, Users, Database, FileText, Globe, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Globe,
      title: "Who we are",
      content: "Our website address is: https://solarhouse.pk"
    },
    {
      icon: FileText,
      title: "Comments",
      content: "When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection. An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment."
    },
    {
      icon: FileText,
      title: "Media",
      content: "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website."
    },
    {
      icon: Cookie,
      title: "Cookies",
      content: "If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.\n\nIf you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.\n\nWhen you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select \"Remember Me\", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.\n\nIf you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day."
    },
    {
      icon: Globe,
      title: "Embedded content from other websites",
      content: "Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.\n\nThese websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website."
    },
    {
      icon: Users,
      title: "Who we share your data with",
      content: "If you request a password reset, your IP address will be included in the reset email."
    },
    {
      icon: Database,
      title: "How long we retain your data",
      content: "If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.\n\nFor users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information."
    },
    {
      icon: Lock,
      title: "What rights you have over your data",
      content: "If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes."
    },
    {
      icon: AlertCircle,
      title: "Where your data is sent",
      content: "Visitor comments may be checked through an automated spam detection service."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 text-center max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <div className="prose prose-slate max-w-none">
                      {section.content.split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-600 leading-relaxed mb-4 last:mb-0">
                          {paragraph.split('\n').map((line, lIndex, arr) => (
                            <React.Fragment key={lIndex}>
                              {line.includes('https://') ? (
                                <>
                                  {line.split(/(https:\/\/[^\s]+)/g).map((part, i) =>
                                    part.match(/^https:\/\//) ? (
                                      <a
                                        key={i}
                                        href={part}
                                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {part}
                                      </a>
                                    ) : (
                                      part
                                    )
                                  )}
                                </>
                              ) : (
                                line
                              )}
                              {lIndex < arr.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Questions about our Privacy Policy?
              </h3>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy or how we handle your data, please don&apos;t hesitate to contact us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} SolarHouse.pk. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}