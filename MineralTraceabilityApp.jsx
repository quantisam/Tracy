import React, { useState, useEffect } from 'react';
import { 
  Shield, Package, Truck, Building, MapPin, Users, TrendingUp, 
  Download, Plus, CheckCircle, AlertTriangle, QrCode, Camera,
  FileText, Clock, Activity, BarChart3, Eye, Send, Box,
  Factory, Anchor, Cpu, Plane, Recycle, ChevronRight,
  Calendar, Search, Filter, Bell, Settings, LogOut,
  Pickaxe, Beaker, Ship, Wrench, Home, ArrowRight,
  CheckSquare, XCircle, Loader2, ExternalLink, Globe,
  Upload, AlertCircle, Lock, Mail, Phone, User,
  CreditCard, FileCheck, Database, Zap, PenTool,
  PackageCheck, PackageX, Weight, Image, Hash,
  ChevronLeft, Save, Edit, Trash2, Copy, Link
} from 'lucide-react';

const MineralTraceabilityApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [userRole, setUserRole] = useState('Extraction');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showUDIRegistration, setShowUDIRegistration] = useState(false);
  const [showCustodyTransfer, setShowCustodyTransfer] = useState(false);
  const [showProcessingSplit, setShowProcessingSplit] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Company Registration Component
  const CompanyRegistration = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      // Step 1: Company Information
      companyName: '',
      companyType: '',
      industryType: '',
      yearsInBusiness: '',
      businessLicense: '',
      taxId: '',
      registrationNumber: '',
      dunsNumber: '',
      
      // Step 2: Location Information
      headquartersAddress: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      operationalLocations: [],
      mineLocations: '',
      processingFacilities: '',
      
      // Step 3: Contact & Compliance
      primaryContactName: '',
      primaryContactTitle: '',
      primaryContactEmail: '',
      primaryContactPhone: '',
      secondaryContactName: '',
      secondaryContactEmail: '',
      iso9001: false,
      iso14001: false,
      iso45001: false,
      msha: false,
      osha: false,
      responsibleMinerals: false,
      
      // Step 4: Administrator Setup
      adminUsername: '',
      adminPassword: '',
      confirmPassword: '',
      adminEmail: '',
      twoFactorEnabled: false,
      primaryBusinessRole: '',
      
      // Step 5: Legal & Terms
      termsAccepted: false,
      privacyAccepted: false,
      itarCompliance: false,
      earCompliance: false,
      ofacScreening: false,
      dataProcessing: false
    });

    const companyTypes = [
      { value: 'MINER', label: 'Mining Company', icon: Pickaxe },
      { value: 'TRANSPORTER', label: 'Transportation/Logistics', icon: Truck },
      { value: 'PROCESSOR', label: 'Processing/Refinery', icon: Beaker },
      { value: 'SHIPPER', label: 'Maritime Shipping', icon: Ship },
      { value: 'MANUFACTURER', label: 'Manufacturer', icon: Factory },
      { value: 'OEM', label: 'OEM/System Integrator', icon: Plane },
      { value: 'RECYCLER', label: 'Recycling Facility', icon: Recycle }
    ];

    const industryTypes = [
      'Rare Earth Elements Mining',
      'Lithium Extraction',
      'Cobalt Mining',
      'Semiconductor Manufacturing',
      'Defense Contractor',
      'Electronics Manufacturing',
      'Battery Production',
      'Recycling & Recovery',
      'Chemical Processing',
      'Logistics & Transportation'
    ];

    const renderStepIndicator = () => {
      const steps = [
        'Company Information',
        'Location Information',
        'Contact & Compliance',
        'Administrator Setup',
        'Legal & Terms'
      ];

      return (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep > index + 1 ? 'bg-green-600 text-white' : 
                    currentStep === index + 1 ? 'bg-gray-400 text-gray-900' : 
                    'bg-gray-700 text-gray-400'}
                `}>
                  {currentStep > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    currentStep > index + 1 ? 'bg-green-600' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div key={index} className="text-xs text-gray-400 text-center flex-1">
                {step}
              </div>
            ))}
          </div>
        </div>
      );
    };

    const renderStepContent = () => {
      switch(currentStep) {
        case 1: // Company Information
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Company Information</h3>
                <p className="text-sm text-gray-400 mb-6">Provide your company details and business registration information</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Select Company Type *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {companyTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({...formData, companyType: type.value})}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.companyType === type.value 
                              ? 'border-gray-400 bg-gray-700' 
                              : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-2 ${
                            formData.companyType === type.value ? 'text-gray-300' : 'text-gray-500'
                          }`} />
                          <p className="text-xs text-gray-300">{type.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      placeholder="Enter legal company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Industry Type *</label>
                    <select
                      value={formData.industryType}
                      onChange={(e) => setFormData({...formData, industryType: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                    >
                      <option value="">Select industry</option>
                      {industryTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Years in Business *</label>
                    <input
                      type="number"
                      value={formData.yearsInBusiness}
                      onChange={(e) => setFormData({...formData, yearsInBusiness: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      placeholder="e.g., 15"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Business License Number *</label>
                    <input
                      type="text"
                      value={formData.businessLicense}
                      onChange={(e) => setFormData({...formData, businessLicense: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      placeholder="License number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tax ID / EIN *</label>
                    <input
                      type="text"
                      value={formData.taxId}
                      onChange={(e) => setFormData({...formData, taxId: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      placeholder="XX-XXXXXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Registration Number</label>
                    <input
                      type="text"
                      value={formData.registrationNumber}
                      onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      placeholder="State/Federal registration"
                    />
                  </div>
                </div>
              </div>
            </div>
          );

        case 2: // Location Information
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Location Information</h3>
                <p className="text-sm text-gray-400 mb-6">Provide headquarters and operational location details</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-4">Headquarters Address</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Street Address *</label>
                      <input
                        type="text"
                        value={formData.headquartersAddress}
                        onChange={(e) => setFormData({...formData, headquartersAddress: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        placeholder="123 Main Street, Suite 100"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">State/Province *</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({...formData, state: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Country *</label>
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        >
                          <option value="">Select</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="MX">Mexico</option>
                          <option value="AU">Australia</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Postal Code *</label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {formData.companyType === 'MINER' && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-200 mb-4">Mining Operations</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Mine Locations</label>
                      <textarea
                        value={formData.mineLocations}
                        onChange={(e) => setFormData({...formData, mineLocations: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        rows="3"
                        placeholder="List all mine locations with coordinates"
                      />
                    </div>
                  </div>
                )}
                
                {formData.companyType === 'PROCESSOR' && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-200 mb-4">Processing Facilities</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Facility Locations</label>
                      <textarea
                        value={formData.processingFacilities}
                        onChange={(e) => setFormData({...formData, processingFacilities: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        rows="3"
                        placeholder="List all processing facility locations"
                      />
                    </div>
                  </div>
                )}
                
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-400">Geographic Compliance Verification</p>
                      <p className="text-sm text-gray-400 mt-1">
                        All locations will be verified for export control compliance and regional regulations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        case 3: // Contact & Compliance
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Contact & Compliance</h3>
                <p className="text-sm text-gray-400 mb-6">Provide contact details and compliance certifications</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-4">Primary Contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.primaryContactName}
                        onChange={(e) => setFormData({...formData, primaryContactName: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title/Role *</label>
                      <input
                        type="text"
                        value={formData.primaryContactTitle}
                        onChange={(e) => setFormData({...formData, primaryContactTitle: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        placeholder="e.g., Compliance Officer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.primaryContactEmail}
                        onChange={(e) => setFormData({...formData, primaryContactEmail: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={formData.primaryContactPhone}
                        onChange={(e) => setFormData({...formData, primaryContactPhone: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-4">Industry Certifications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                      <input
                        type="checkbox"
                        checked={formData.iso9001}
                        onChange={(e) => setFormData({...formData, iso9001: e.target.checked})}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-gray-200">ISO 9001 (Quality Management)</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                      <input
                        type="checkbox"
                        checked={formData.iso14001}
                        onChange={(e) => setFormData({...formData, iso14001: e.target.checked})}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-gray-200">ISO 14001 (Environmental)</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                      <input
                        type="checkbox"
                        checked={formData.iso45001}
                        onChange={(e) => setFormData({...formData, iso45001: e.target.checked})}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-gray-200">ISO 45001 (Health & Safety)</span>
                    </label>
                    
                    {formData.companyType === 'MINER' && (
                      <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.msha}
                          onChange={(e) => setFormData({...formData, msha: e.target.checked})}
                          className="w-5 h-5 rounded"
                        />
                        <span className="text-gray-200">MSHA Certified</span>
                      </label>
                    )}
                    
                    <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                      <input
                        type="checkbox"
                        checked={formData.osha}
                        onChange={(e) => setFormData({...formData, osha: e.target.checked})}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-gray-200">OSHA Compliant</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-700 rounded-lg hover:bg-gray-600">
                      <input
                        type="checkbox"
                        checked={formData.responsibleMinerals}
                        onChange={(e) => setFormData({...formData, responsibleMinerals: e.target.checked})}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-gray-200">Responsible Minerals Initiative</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Upload Compliance Documentation</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 cursor-pointer">
                    <FileCheck className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-300">Click to upload certificates</p>
                    <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG up to 10MB each</p>
                  </div>
                </div>
              </div>
            </div>
          );

        case 4: // Administrator Setup
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Administrator Setup</h3>
                <p className="text-sm text-gray-400 mb-6">Create your primary administrator account</p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Admin Username *</label>
                    <input
                      type="text"
                      value={formData.adminUsername}
                      onChange={(e) => setFormData({...formData, adminUsername: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      placeholder="Choose a username"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Admin Email *</label>
                    <input
                      type="email"
                      value={formData.adminEmail}
                      onChange={(e) => setFormData({...formData, adminEmail: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                    <input
                      type="password"
                      value={formData.adminPassword}
                      onChange={(e) => setFormData({...formData, adminPassword: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password *</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Primary Business Role in Supply Chain *</label>
                  <select
                    value={formData.primaryBusinessRole}
                    onChange={(e) => setFormData({...formData, primaryBusinessRole: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                  >
                    <option value="">Select primary role</option>
                    <option value="extraction">Raw Material Extraction</option>
                    <option value="processing">Processing & Refinement</option>
                    <option value="manufacturing">Component Manufacturing</option>
                    <option value="assembly">System Assembly</option>
                    <option value="logistics">Logistics & Transportation</option>
                    <option value="recycling">Recycling & Recovery</option>
                  </select>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.twoFactorEnabled}
                      onChange={(e) => setFormData({...formData, twoFactorEnabled: e.target.checked})}
                      className="w-5 h-5 rounded mt-0.5"
                    />
                    <div>
                      <span className="text-gray-200 font-medium">Enable Two-Factor Authentication</span>
                      <p className="text-sm text-gray-400 mt-1">
                        Highly recommended for enhanced security. You'll receive a code via SMS or authenticator app.
                      </p>
                    </div>
                  </label>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-400">Password Requirements</p>
                      <ul className="text-sm text-gray-400 mt-2 space-y-1">
                        <li>• Minimum 12 characters</li>
                        <li>• At least one uppercase and lowercase letter</li>
                        <li>• At least one number and special character</li>
                        <li>• Cannot contain username or company name</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        case 5: // Legal & Terms
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Legal & Terms</h3>
                <p className="text-sm text-gray-400 mb-6">Review and accept terms and regulatory compliance</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                        className="w-5 h-5 rounded mt-0.5"
                      />
                      <div>
                        <span className="text-gray-200 font-medium">Terms of Service *</span>
                        <p className="text-sm text-gray-400 mt-1">
                          I have read and agree to the CriticalTrace Terms of Service including data usage, 
                          platform fees, and service level agreements.
                        </p>
                      </div>
                    </label>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacyAccepted}
                        onChange={(e) => setFormData({...formData, privacyAccepted: e.target.checked})}
                        className="w-5 h-5 rounded mt-0.5"
                      />
                      <div>
                        <span className="text-gray-200 font-medium">Privacy Policy *</span>
                        <p className="text-sm text-gray-400 mt-1">
                          I acknowledge the Privacy Policy and understand how my data will be collected, 
                          processed, and protected.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-4">Regulatory Compliance Confirmation</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.itarCompliance}
                          onChange={(e) => setFormData({...formData, itarCompliance: e.target.checked})}
                          className="w-5 h-5 rounded mt-0.5"
                        />
                        <div>
                          <span className="text-gray-200 font-medium">ITAR Compliance</span>
                          <p className="text-sm text-gray-400 mt-1">
                            We comply with International Traffic in Arms Regulations where applicable
                          </p>
                        </div>
                      </label>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.earCompliance}
                          onChange={(e) => setFormData({...formData, earCompliance: e.target.checked})}
                          className="w-5 h-5 rounded mt-0.5"
                        />
                        <div>
                          <span className="text-gray-200 font-medium">EAR Compliance</span>
                          <p className="text-sm text-gray-400 mt-1">
                            We comply with Export Administration Regulations
                          </p>
                        </div>
                      </label>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.ofacScreening}
                          onChange={(e) => setFormData({...formData, ofacScreening: e.target.checked})}
                          className="w-5 h-5 rounded mt-0.5"
                        />
                        <div>
                          <span className="text-gray-200 font-medium">OFAC Screening Consent *</span>
                          <p className="text-sm text-gray-400 mt-1">
                            I consent to screening against OFAC and international sanctions lists
                          </p>
                        </div>
                      </label>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.dataProcessing}
                          onChange={(e) => setFormData({...formData, dataProcessing: e.target.checked})}
                          className="w-5 h-5 rounded mt-0.5"
                        />
                        <div>
                          <span className="text-gray-200 font-medium">Data Processing Agreement *</span>
                          <p className="text-sm text-gray-400 mt-1">
                            I agree to data processing for supply chain tracking and regulatory reporting
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400">Onboarding Process</p>
                      <p className="text-sm text-gray-400 mt-1">
                        After submission, your application will undergo:
                      </p>
                      <ul className="text-sm text-gray-400 mt-2 space-y-1">
                        <li>• Business verification (1-2 business days)</li>
                        <li>• Sanctions and compliance screening (24-48 hours)</li>
                        <li>• Document review and approval</li>
                        <li>• Account activation upon successful verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    const isStepValid = () => {
      switch(currentStep) {
        case 1:
          return formData.companyName && formData.companyType && formData.taxId;
        case 2:
          return formData.city && formData.country;
        case 3:
          return formData.primaryContactName && formData.primaryContactEmail;
        case 4:
          return formData.adminUsername && formData.adminPassword;
        case 5:
          return formData.termsAccepted && formData.privacyAccepted && formData.ofacScreening;
        default:
          return true;
      }
    };

    return (
      <div className="min-h-screen bg-gray-900 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="w-10 h-10 text-gray-400" />
              <h1 className="text-3xl font-bold text-gray-100">CriticalTrace</h1>
            </div>
            <p className="text-gray-400">Critical Minerals Supply Chain Platform - Company Registration</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            {renderStepIndicator()}
            
            <div className="mt-8">
              {renderStepContent()}
            </div>
            
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}
              
              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepValid()}
                  className={`ml-auto px-6 py-2 rounded-lg flex items-center space-x-2 ${
                    isStepValid() 
                      ? 'bg-gray-400 text-gray-900 hover:bg-gray-300' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onComplete}
                  disabled={!isStepValid()}
                  className={`ml-auto px-6 py-2 rounded-lg flex items-center space-x-2 ${
                    isStepValid()
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Submit Application</span>
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <button onClick={onComplete} className="text-gray-300 hover:text-gray-100 underline">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Login Screen
  const LoginScreen = ({ onLogin, onSignUp }) => {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-100">CriticalTrace</h1>
            <p className="text-gray-400">Critical Minerals Supply Chain Platform</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Sign In</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                />
              </div>
              
              <button
                onClick={onLogin}
                className="w-full bg-gray-400 text-gray-900 py-2 rounded-lg hover:bg-gray-300 font-medium"
              >
                Sign In
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-center text-gray-400 text-sm">
                Don't have an account?{' '}
                <button onClick={onSignUp} className="text-gray-300 hover:text-gray-100 underline">
                  Register your company
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // QR Scanner Component
  const QRScanner = ({ onClose }) => {
    const [scanning, setScanning] = useState(true);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setScanning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-100">Scan QR Code</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          
          <div className="bg-gray-900 rounded-lg aspect-square flex items-center justify-center">
            {scanning ? (
              <Camera className="h-16 w-16 text-gray-400 animate-pulse" />
            ) : (
              <CheckCircle className="h-16 w-16 text-green-500" />
            )}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              {scanning ? 'Scanning...' : 'UDI: MIX-2024-001-XR7K9'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced UDI Registration Modal with Smart Generation
  const UDIRegistrationModal = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      // Auto-populated from company profile
      mineralType: 'MIX',
      companyAcronym: 'USCM', // From U.S. Critical Materials
      stateCode: 'NV', // Nevada
      siteCode: '', // Will be selected from dropdown
      extractionDate: new Date().toISOString().split('T')[0],
      batchNumber: '001', // Auto-incremented
      
      // Additional extraction details
      quantity: '',
      unit: 'tonnes',
      estimatedPurity: '',
      siteLocation: '',
      mineSection: '',
      geologicalFormation: '',
      extractionMethod: '',
      supervisorName: '',
      
      // Packaging
      packageId: '',
      packageType: '',
      sealNumber: '',
      grossWeight: '',
      netWeight: '',
      
      // Documents
      extractionPermit: null,
      geologicalReport: null,
      qualityAssurance: null,
      photos: []
    });

    // Available mine sites for the company
    const mineSites = [
      { code: 'SHEE', name: 'Sheeps Creek Mine', state: 'MT' },
      { code: 'MVPK', name: 'Mountain View Peak', state: 'NV' },
      { code: 'DESM', name: 'Desert Moon Site', state: 'NV' },
      { code: 'SILV', name: 'Silver Ridge', state: 'ID' }
    ];

    const extractionMethods = [
      'Open Pit Mining',
      'Underground Mining',
      'Placer Mining',
      'Solution Mining',
      'In-Situ Leaching'
    ];

    // Generate UDI with new format
    const generateUDI = () => {
      const { mineralType, companyAcronym, stateCode, siteCode, extractionDate, batchNumber } = formData;
      const dateStr = extractionDate.replace(/-/g, '');
      const batchStr = batchNumber.padStart(3, '0');
      
      // Format: MIX-USCM-NV-SHEE-20240805-001
      return `${mineralType}-${companyAcronym}-${stateCode}-${siteCode || 'XXXX'}-${dateStr}-${batchStr}`;
    };

    // Auto-increment batch number based on site and date
    useEffect(() => {
      if (formData.siteCode && formData.extractionDate) {
        // In production, this would query the database for the last batch number
        // For now, we'll simulate it
        const lastBatchNumber = 0; // Would be fetched from API
        setFormData(prev => ({ ...prev, batchNumber: String(lastBatchNumber + 1).padStart(3, '0') }));
      }
    }, [formData.siteCode, formData.extractionDate]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 py-8">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-100">New Extraction Registration</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                {['Site & Material', 'Extraction Details', 'Documents', 'Review'].map((step, idx) => (
                  <div key={idx} className="flex items-center flex-1">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${currentStep > idx + 1 ? 'bg-green-600 text-white' :
                        currentStep === idx + 1 ? 'bg-blue-600 text-white' :
                        'bg-gray-700 text-gray-500'}
                    `}>
                      {currentStep > idx + 1 ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                    </div>
                    {idx < 3 && (
                      <div className={`flex-1 h-0.5 ${currentStep > idx + 1 ? 'bg-green-600' : 'bg-gray-700'}`} />
                    )}
                  </div>
                ))}
              </div>

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-blue-400 mb-2">Generated UDI Preview</h3>
                    <p className="text-2xl font-mono text-white">{generateUDI()}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Format: MINERAL-COMPANY-STATE-SITE-DATE-BATCH
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Mineral Type (Auto-set to MIX)
                      </label>
                      <input
                        type="text"
                        value={formData.mineralType}
                        disabled
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">Unprocessed materials default to MIX</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Mine Site *
                      </label>
                      <select
                        value={formData.siteCode}
                        onChange={(e) => {
                          const site = mineSites.find(s => s.code === e.target.value);
                          setFormData({
                            ...formData, 
                            siteCode: e.target.value,
                            stateCode: site?.state || formData.stateCode,
                            siteLocation: site?.name || ''
                          });
                        }}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      >
                        <option value="">Select mine site</option>
                        {mineSites.map(site => (
                          <option key={site.code} value={site.code}>
                            {site.name} ({site.code}) - {site.state}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Extraction Date *
                      </label>
                      <input
                        type="date"
                        value={formData.extractionDate}
                        onChange={(e) => setFormData({...formData, extractionDate: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Batch Number (Auto-generated)
                      </label>
                      <input
                        type="text"
                        value={formData.batchNumber}
                        disabled
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">Increments per site/date</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Quantity *
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={formData.quantity}
                          onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                          placeholder="0.00"
                        />
                        <select
                          value={formData.unit}
                          onChange={(e) => setFormData({...formData, unit: e.target.value})}
                          className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        >
                          <option value="tonnes">tonnes</option>
                          <option value="kg">kg</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Extraction Method *
                      </label>
                      <select
                        value={formData.extractionMethod}
                        onChange={(e) => setFormData({...formData, extractionMethod: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                      >
                        <option value="">Select method</option>
                        {extractionMethods.map(method => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-200 mb-4">Additional Extraction Details</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Mine Section/Block
                      </label>
                      <input
                        type="text"
                        value={formData.mineSection}
                        onChange={(e) => setFormData({...formData, mineSection: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        placeholder="e.g., Section A-12"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Geological Formation
                      </label>
                      <input
                        type="text"
                        value={formData.geologicalFormation}
                        onChange={(e) => setFormData({...formData, geologicalFormation: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        placeholder="e.g., Pegmatite vein"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Estimated Purity (%)
                      </label>
                      <input
                        type="number"
                        value={formData.estimatedPurity}
                        onChange={(e) => setFormData({...formData, estimatedPurity: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        placeholder="e.g., 94.5"
                        step="0.1"
                        max="100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Supervisor Name *
                      </label>
                      <input
                        type="text"
                        value={formData.supervisorName}
                        onChange={(e) => setFormData({...formData, supervisorName: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        placeholder="Site supervisor"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-gray-300 mb-3">Packaging Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Package Type
                        </label>
                        <select
                          value={formData.packageType}
                          onChange={(e) => setFormData({...formData, packageType: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                        >
                          <option value="">Select type</option>
                          <option value="bulk">Bulk Container</option>
                          <option value="drum">Drum</option>
                          <option value="supersack">Super Sack</option>
                          <option value="pallet">Palletized</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Seal Number
                        </label>
                        <input
                          type="text"
                          value={formData.sealNumber}
                          onChange={(e) => setFormData({...formData, sealNumber: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                          placeholder="Security seal #"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-200 mb-4">Required Documents</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Extraction Permit *
                      </label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 cursor-pointer transition-colors">
                        <FileText className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-300">Upload extraction permit</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG up to 10MB</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Geological Report
                      </label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 cursor-pointer transition-colors">
                        <FileCheck className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-300">Upload geological analysis</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC up to 10MB</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Quality Assurance Certificate
                      </label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 cursor-pointer transition-colors">
                        <Shield className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-300">Upload QA certificate</p>
                        <p className="text-xs text-gray-500 mt-1">PDF up to 10MB</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Site Photos
                      </label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 cursor-pointer transition-colors">
                        <Image className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-300">Upload extraction photos</p>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 50MB total</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-400">Document Requirements</p>
                        <p className="text-sm text-gray-400 mt-1">
                          All uploaded documents will be permanently linked to this UDI and accessible throughout 
                          the supply chain. Ensure all required permits and certifications are included.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-200 mb-4">Review & Submit</h3>
                  
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h4 className="text-md font-medium text-gray-200 mb-4">Extraction Summary</h4>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Generated UDI</p>
                        <p className="text-lg font-mono text-white">{generateUDI()}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Site Location</p>
                        <p className="text-sm text-gray-200">{formData.siteLocation}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Quantity</p>
                        <p className="text-sm text-gray-200">{formData.quantity} {formData.unit}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Extraction Method</p>
                        <p className="text-sm text-gray-200">{formData.extractionMethod}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Supervisor</p>
                        <p className="text-sm text-gray-200">{formData.supervisorName}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Documents Uploaded</p>
                        <p className="text-sm text-gray-200">4 files attached</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-400">Ready to Generate UDI</p>
                        <p className="text-sm text-gray-400 mt-1">
                          This UDI will be permanently registered and serve as the parent for all downstream 
                          processing. All attached documents will be accessible throughout the supply chain.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                  >
                    Previous
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      console.log('Generated UDI:', generateUDI());
                      console.log('Form Data:', formData);
                      onClose();
                    }}
                    className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Generate UDI & Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Custody Transfer Modal
  const CustodyTransferModal = ({ onClose }) => {
    const [step, setStep] = useState('sender');
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg max-w-2xl w-full">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-gray-100">Custody Transfer</h2>
          </div>
          
          <div className="p-6">
            {step === 'sender' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Recipient Company</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100">
                    <option>Select recipient</option>
                    <option>INL Processing Facility</option>
                    <option>American Trucking Co.</option>
                  </select>
                </div>
                
                <div>
                  <button className="w-full bg-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Capture GPS Location</span>
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Digital Signature</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <PenTool className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">Draw your signature</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setStep('complete')}
                  className="w-full bg-gray-400 text-gray-900 py-2 rounded-lg hover:bg-gray-300"
                >
                  Send to Recipient
                </button>
              </div>
            )}
            
            {step === 'complete' && (
              <div className="text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <h3 className="text-lg font-medium text-gray-200">Transfer Complete</h3>
                <button onClick={onClose} className="px-6 py-2 bg-gray-600 text-gray-300 rounded-lg">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Processing Split Modal
  const ProcessingSplitModal = ({ onClose }) => {
    const [outputs, setOutputs] = useState([
      { element: 'Gallium', quantity: 15, purity: 99.99 },
      { element: 'Neodymium', quantity: 20, purity: 99.5 }
    ]);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 py-8">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-gray-100">Process & Split UDI</h2>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-400">Input Material</p>
                    <p className="text-2xl font-bold text-gray-200">50 tonnes</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Output</p>
                    <p className="text-2xl font-bold text-gray-200">40 tonnes</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Waste/Loss</p>
                    <p className="text-2xl font-bold text-orange-500">10 tonnes (20%)</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-200">Refined Outputs</h3>
                {outputs.map((output, idx) => (
                  <div key={idx} className="bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-400">Element</p>
                        <p className="text-gray-200">{output.element}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Quantity</p>
                        <p className="text-gray-200">{output.quantity} tonnes</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Purity</p>
                        <p className="text-gray-200">{output.purity}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-end">
                <button onClick={onClose} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Generate Child UDIs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Dashboard Component
  const MainDashboard = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
    const [selectedBatch, setSelectedBatch] = useState(null);
    
    const roleConfigs = {
      'Extraction': { icon: Pickaxe, company: 'USCM Mountain Peak Mining', label: 'Extraction Operator' },
      'Logistics': { icon: Truck, company: 'American Trucking Co.', label: 'Logistics Provider' },
      'Refinement': { icon: Beaker, company: 'INL Processing Facility', label: 'Refinement Facility' },
      'Maritime': { icon: Ship, company: 'MSC Mediterranean', label: 'Maritime Logistics' },
      'Manufacturing': { icon: Factory, company: 'Freiberger Materials', label: 'Component Manufacturer' },
      'Integration': { icon: Plane, company: 'Lockheed Martin', label: 'Systems Integrator' },
      'Recovery': { icon: Recycle, company: 'Recycle America Inc.', label: 'Recovery Operator' }
    };

    const currentConfig = roleConfigs[userRole];
    const Icon = currentConfig.icon;

    // Mock data for charts
    const volumeData = [
      { time: '7/6', value: 45 },
      { time: '7/8', value: 52 },
      { time: '7/10', value: 48 },
      { time: '7/12', value: 58 },
      { time: '7/14', value: 62 },
      { time: '7/16', value: 55 },
      { time: '7/18', value: 68 },
      { time: '7/20', value: 72 },
      { time: '7/22', value: 65 },
      { time: '7/24', value: 78 },
      { time: '7/26', value: 82 },
      { time: '7/28', value: 75 },
      { time: '7/30', value: 88 },
      { time: '8/1', value: 92 }
    ];

    if (userRole === 'Extraction') {
      return (
        <div className="min-h-screen bg-gray-950">
          {/* Sidebar */}
          <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 border-r border-gray-800">
            <div className="p-6">
              <h1 className="text-xl font-bold text-white mb-8">CriticalTrace</h1>
              
              <nav className="space-y-1">
                <a href="#" className="flex items-center space-x-3 px-3 py-2 bg-gray-800 rounded-lg text-white">
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-lg">
                  <Truck className="w-5 h-5" />
                  <span>Shipments</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-lg">
                  <FileText className="w-5 h-5" />
                  <span>Documents</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-lg">
                  <Globe className="w-5 h-5" />
                  <span>Global View</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-lg">
                  <BarChart3 className="w-5 h-5" />
                  <span>Analytics</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:bg-gray-800 rounded-lg">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="ml-64 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Mining Operations Dashboard</h2>
                <p className="text-gray-400 text-sm mt-1">USCM Mountain Peak Mining</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Nevada, USA</span>
                </div>
                <button className="relative p-2 text-gray-400 hover:text-gray-300">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full"></span>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-300">
                  <User className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Total Extraction</p>
                  <Package className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-3xl font-bold text-white mb-2">247.8T</p>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-sm">↑ +4.2%</span>
                  <span className="text-gray-500 text-xs">vs last month</span>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Active Batches</p>
                  <Activity className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-3xl font-bold text-white mb-2">18</p>
                <p className="text-gray-500 text-xs">Ready for transport</p>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Top Material</p>
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">REE-MIX</p>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-sm">↑ +12.5%</span>
                  <span className="text-gray-500 text-xs">Rare Earth Mix</span>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">New Extraction</p>
                  <Plus className="w-5 h-5 text-gray-600" />
                </div>
                <button
                  onClick={() => setShowUDIRegistration(true)}
                  className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Extraction</span>
                </button>
                <p className="text-xs text-gray-500 mt-2">Generate UDI for new batch</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* UDI Watchlist */}
              <div className="col-span-1 space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">UDI Watchlist</h3>
                
                <div className={`bg-gray-900 rounded-xl p-4 border-2 cursor-pointer transition-all ${
                  selectedBatch === 'MIX-20240805-BATCH001-XR7K9' ? 'border-blue-500' : 'border-gray-800 hover:border-gray-700'
                }`} onClick={() => setSelectedBatch('MIX-20240805-BATCH001-XR7K9')}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-mono text-blue-400">MIX-20240805-BATCH001-XR7K9</p>
                      <p className="text-xs text-gray-400 mt-1">Mixed Rare Earth Elements</p>
                    </div>
                    <Package className="w-4 h-4 text-gray-600" />
                  </div>
                  
                  <p className="text-2xl font-bold text-white mb-2">48.7T</p>
                  
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-green-400">$2.84M</span>
                    <span className="text-gray-500">(+0.24%)</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Status</span>
                      <span className="text-green-400">At Mine Site</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Created</span>
                      <span className="text-gray-400">2 hours ago</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Purity</span>
                      <span className="text-gray-400">94.2%</span>
                    </div>
                  </div>
                </div>

                <div className={`bg-gray-900 rounded-xl p-4 border cursor-pointer transition-all ${
                  selectedBatch === 'MIX-20240804-BATCH087-LI2K3' ? 'border-blue-500 border-2' : 'border-gray-800 hover:border-gray-700'
                }`} onClick={() => setSelectedBatch('MIX-20240804-BATCH087-LI2K3')}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-mono text-blue-400">MIX-20240804-BATCH087-LI2K3</p>
                      <p className="text-xs text-gray-400 mt-1">Mixed REE - High Lithium</p>
                    </div>
                    <Truck className="w-4 h-4 text-yellow-500" />
                  </div>
                  
                  <p className="text-2xl font-bold text-white mb-2">32.4T</p>
                  
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-green-400">$1.89M</span>
                    <span className="text-gray-500">(+1.8%)</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Status</span>
                      <span className="text-yellow-400">In Transit</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Carrier</span>
                      <span className="text-gray-400">American Trucking</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">ETA</span>
                      <span className="text-gray-400">4 hrs</span>
                    </div>
                  </div>
                </div>

                <div className={`bg-gray-900 rounded-xl p-4 border cursor-pointer transition-all ${
                  selectedBatch === 'MIX-20240803-BATCH156-CO9P7' ? 'border-blue-500 border-2' : 'border-gray-800 hover:border-gray-700'
                }`} onClick={() => setSelectedBatch('MIX-20240803-BATCH156-CO9P7')}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-mono text-blue-400">MIX-20240803-BATCH156-CO9P7</p>
                      <p className="text-xs text-gray-400 mt-1">Cobalt Rich Mix</p>
                    </div>
                    <Beaker className="w-4 h-4 text-purple-500" />
                  </div>
                  
                  <p className="text-2xl font-bold text-white mb-2">28.9T</p>
                  
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-red-400">$1.68M</span>
                    <span className="text-gray-500">(-0.5%)</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Status</span>
                      <span className="text-purple-400">Processing</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Location</span>
                      <span className="text-gray-400">INL Facility</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Complete</span>
                      <span className="text-gray-400">Tomorrow</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 cursor-pointer hover:border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-mono text-blue-400">MIX-20240802-BATCH201-ND4K8</p>
                      <p className="text-xs text-gray-400 mt-1">Neodymium Concentrate</p>
                    </div>
                    <Ship className="w-4 h-4 text-blue-500" />
                  </div>
                  
                  <p className="text-2xl font-bold text-white mb-2">15.2T</p>
                  
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-green-400">$887K</span>
                    <span className="text-gray-500">(+0.3%)</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Status</span>
                      <span className="text-blue-400">At Port</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Vessel</span>
                      <span className="text-gray-400">MSC Frontier</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Departure</span>
                      <span className="text-gray-400">Aug 7, 14:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Tracking & Timeline */}
              <div className="col-span-2 bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {selectedBatch || 'Select a UDI'}
                    </h3>
                    <p className="text-sm text-gray-400">Supply Chain Journey</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">
                      <MapPin className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">
                      <Clock className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Journey Timeline */}
                <div className="mb-6">
                  <div className="relative">
                    {/* Progress Bar */}
                    <div className="absolute top-5 left-0 right-0 h-1 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-5 left-0 h-1 bg-blue-500 rounded-full" style={{width: '35%'}}></div>
                    
                    {/* Journey Steps */}
                    <div className="relative flex justify-between">
                      {/* Mine Site */}
                      <div className="text-center">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-2">
                          <Pickaxe className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xs font-medium text-white">Mine Site</p>
                        <p className="text-xs text-gray-500">USCM Nevada</p>
                        <p className="text-xs text-green-400 mt-1">Completed</p>
                      </div>
                      
                      {/* Transport */}
                      <div className="text-center">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mb-2 animate-pulse">
                          <Truck className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xs font-medium text-white">Transport</p>
                        <p className="text-xs text-gray-500">Highway I-80</p>
                        <p className="text-xs text-yellow-400 mt-1">In Progress</p>
                      </div>
                      
                      {/* Processing */}
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                          <Beaker className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-xs font-medium text-gray-400">Processing</p>
                        <p className="text-xs text-gray-600">INL Facility</p>
                        <p className="text-xs text-gray-600 mt-1">Pending</p>
                      </div>
                      
                      {/* Maritime */}
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                          <Ship className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-xs font-medium text-gray-400">Port</p>
                        <p className="text-xs text-gray-600">Long Beach</p>
                        <p className="text-xs text-gray-600 mt-1">--</p>
                      </div>
                      
                      {/* Delivery */}
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                          <Factory className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-xs font-medium text-gray-400">Delivery</p>
                        <p className="text-xs text-gray-600">End Customer</p>
                        <p className="text-xs text-gray-600 mt-1">--</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Location Map */}
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-300">Live Location</h4>
                    <span className="text-xs text-gray-500">Last updated: 2 min ago</span>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg h-48 relative overflow-hidden">
                    {/* Simple map representation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-pulse" />
                        <p className="text-sm text-gray-400">39.5501° N, 116.7519° W</p>
                        <p className="text-xs text-gray-500">Highway I-80, Nevada</p>
                      </div>
                    </div>
                    
                    {/* Map grid lines */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="h-full w-full" style={{
                        backgroundImage: 'linear-gradient(0deg, #ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">ETA</span>
                    </div>
                    <p className="text-lg font-semibold text-white">4h 15m</p>
                    <p className="text-xs text-gray-400">Aug 5, 18:45</p>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Activity className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">Distance</span>
                    </div>
                    <p className="text-lg font-semibold text-white">187 km</p>
                    <p className="text-xs text-gray-400">42% complete</p>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">Next Step</span>
                    </div>
                    <p className="text-sm font-semibold text-white">INL Processing</p>
                    <p className="text-xs text-gray-400">Refinement Facility</p>
                  </div>
                </div>

                {/* Chain of Custody */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Chain of Custody</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-400">Created at USCM Mine</span>
                      </div>
                      <span className="text-gray-500">Aug 5, 08:00</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-400">Transferred to American Trucking</span>
                      </div>
                      <span className="text-gray-500">Aug 5, 14:30</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-400">In transit to INL Processing</span>
                      </div>
                      <span className="text-gray-500">Current</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Materials View */}
            <div className="mt-6 bg-gray-900 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Global Materials Market</h3>
                <Globe className="w-5 h-5 text-gray-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-4">Critical Minerals Index</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-white">REE Composite</span>
                        <span className="text-xs text-gray-500">REEC</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">$847.32</p>
                        <p className="text-xs text-green-400">+2.4%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-white">Lithium Spot</span>
                        <span className="text-xs text-gray-500">Li2CO3</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">$72.50</p>
                        <p className="text-xs text-red-400">-0.8%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-white">Cobalt LME</span>
                        <span className="text-xs text-gray-500">CO</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">$134.20</p>
                        <p className="text-xs text-green-400">+1.2%</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-4">Regional Production</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">United States</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-800 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
                        </div>
                        <span className="text-xs text-gray-400">78%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">Australia</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-800 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '62%'}}></div>
                        </div>
                        <span className="text-xs text-gray-400">62%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">Canada</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-800 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <span className="text-xs text-gray-400">45%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modals */}
          {showQRScanner && <QRScanner onClose={() => setShowQRScanner(false)} />}
          {showUDIRegistration && <UDIRegistrationModal onClose={() => setShowUDIRegistration(false)} />}
          {showCustodyTransfer && <CustodyTransferModal onClose={() => setShowCustodyTransfer(false)} />}
          {showProcessingSplit && <ProcessingSplitModal onClose={() => setShowProcessingSplit(false)} />}
        </div>
      );
    }

    // Default dashboard for other roles
    return (
      <div className="min-h-screen bg-gray-950 p-8">
        <div className="text-center py-20">
          <Icon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">{currentConfig.label} Dashboard</h2>
          <p className="text-gray-400">{currentConfig.company}</p>
          <p className="text-sm text-gray-500 mt-4">Dashboard under development</p>
        </div>
      </div>
    );
  };

  // Main App Render
  if (showSignUp) {
    return <CompanyRegistration onComplete={() => setShowSignUp(false)} />;
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen 
        onLogin={() => setIsAuthenticated(true)}
        onSignUp={() => setShowSignUp(true)}
      />
    );
  }

  return <MainDashboard />;
};

export default MineralTraceabilityApp;
