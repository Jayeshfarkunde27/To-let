
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { addProperty, uploadPropertyImage } from '../../services/db';
import { generatePropertyDescription } from '../../services/geminiService';
import { Loader2, Upload, Sparkles, X, ChevronLeft } from 'lucide-react';
import { PropertyType, FurnishingStatus } from '../../types';

const AddProperty: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'Apartment' as PropertyType,
    bhk: '2',
    furnishing: 'Semi Furnished' as FurnishingStatus,
    location: '',
    price: '',
    maintenance: '',
    deposit: '',
    availableFrom: '',
    amenities: '',
    description: '',
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.type || !formData.location) {
      alert("Please fill in Type and Location first!");
      return;
    }
    setGeneratingAI(true);
    const desc = await generatePropertyDescription({
      type: formData.type,
      bhk: Number(formData.bhk),
      furnishing: formData.furnishing,
      location: formData.location,
      price: Number(formData.price),
      amenities: formData.amenities.split(',').map(s => s.trim())
    });
    setFormData(prev => ({ ...prev, description: desc }));
    setGeneratingAI(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      let imageUrl = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000'; // Default
      
      if (imageFile) {
        try {
          imageUrl = await uploadPropertyImage(imageFile);
        } catch (err) {
          console.error("Image upload failed, using fallback");
        }
      }

      await addProperty({
        title: formData.title,
        type: formData.type,
        bhk: Number(formData.bhk),
        furnishing: formData.furnishing,
        location: formData.location,
        price: Number(formData.price),
        maintenance: Number(formData.maintenance),
        deposit: Number(formData.deposit),
        availableFrom: formData.availableFrom,
        description: formData.description,
        amenities: formData.amenities.split(',').map(item => item.trim()).filter(i => i),
        images: [imageUrl],
        ownerId: user.uid,
        rating: 0,
        views: 0
      });

      navigate('/owner/dashboard');
    } catch (error) {
      console.error("Failed to add property:", error);
      alert("Failed to add property. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">List Your Property</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Property Title</label>
              <input
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Spacious 2BHK in Koramangala"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Property Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-100"
              >
                <option value="Apartment">Apartment</option>
                <option value="Independent House">Independent House</option>
                <option value="PG/Hostel">PG / Hostel</option>
                <option value="Room">Single Room</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">BHK Configuration</label>
              <select
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-100"
              >
                <option value="1">1 BHK / 1 RK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Furnishing Status</label>
              <select
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-100"
              >
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi Furnished">Semi Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Location</label>
              <input
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="Locality, City (e.g. HSR Layout, Bangalore)"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Monthly Rent (₹)</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="25000"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Maintenance (₹/mo)</label>
              <input
                type="number"
                name="maintenance"
                value={formData.maintenance}
                onChange={handleChange}
                placeholder="2000"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Deposit Amount (₹)</label>
              <input
                type="number"
                name="deposit"
                required
                value={formData.deposit}
                onChange={handleChange}
                placeholder="100000"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-100"
              />
            </div>

             <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Available From</label>
              <input
                type="date"
                name="availableFrom"
                required
                value={formData.availableFrom}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Amenities</label>
            <input
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="Geyser, Power Backup, Lift, Security..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Description</label>
              <button 
                type="button"
                onClick={handleGenerateDescription}
                disabled={generatingAI}
                className="text-xs flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors font-bold disabled:opacity-50"
              >
                {generatingAI ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                Generate with AI
              </button>
            </div>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your property..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 resize-none text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Property Image</label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative">
              {previewUrl ? (
                <div className="relative inline-block">
                  <img src={previewUrl} alt="Preview" className="h-48 rounded-lg object-cover" />
                  <button 
                    type="button"
                    onClick={() => { setPreviewUrl(null); setImageFile(null); }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
                    <Upload size={32} />
                    <p className="font-medium">Click or Drag to upload image</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={() => navigate('/owner/dashboard')}
              className="px-6 py-3 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all flex items-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'List Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
