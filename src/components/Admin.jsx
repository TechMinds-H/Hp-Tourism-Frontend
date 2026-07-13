import { useEffect, useState } from 'react';
import {
    Users,
    IndianRupee,
    Plane,
    XCircle,
    CheckCircle,
    TrendingUp,
    Mountain,
    Calendar
} from 'lucide-react';


export default function Admin() {

    const [stats, setStats] = useState({});
    const [bookings, setBookings] = useState([]);
    const [selectedTab, setSelectedTab] = useState('all');

    useEffect(() => {
        fetch('http://hp-tourism-backend.vercel.app/api/admin/stats')
            .then(res => res.json())
            .then(data => setStats(data));

        fetch('http://hp-tourism-backend.vercel.app/api/admin/bookings')
            .then(res => res.json())
            .then(data => setBookings(data));
    }, []);

    const filteredBookings =
        selectedTab === 'all'
            ? bookings
            : bookings.filter(
                booking => booking.status === selectedTab
            );

    return (
        <div className="min-h-screen bg-slate-100">

            <div className="max-w-7xl mx-auto px-8 py-10">

                {/* Hero */}
                <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-10 text-white mb-10">

                    <h1 className="text-5xl font-black">
                        HP Tourism Admin Portal
                    </h1>

                    <p className="mt-3 text-lg text-slate-300">
                        Manage Bookings, Customers & Revenue
                    </p>

                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-3xl shadow-xl">
                        <Plane size={45} />
                        <h2 className="text-4xl font-black mt-4">
                            {stats.totalBookings || 0}
                        </h2>
                        <p>Total Bookings</p>
                    </div>

                    <div
                        onClick={() => setSelectedTab('confirmed')}
                        className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-3xl shadow-xl cursor-pointer hover:scale-105 transition"
                    >

                        <CheckCircle size={45} />
                        <h2 className="text-4xl font-black mt-4">
                            {stats.confirmedBookings || 0}
                        </h2>
                        <p>Confirmed Trips</p>
                    </div>

                    <div
                        onClick={() => setSelectedTab('cancelled')}
                        className="bg-gradient-to-br from-red-500 to-red-700 text-white p-6 rounded-3xl shadow-xl cursor-pointer hover:scale-105 transition"
                    >
                        <XCircle size={45} />
                        <h2 className="text-4xl font-black mt-4">
                            {stats.cancelledBookings || 0}
                        </h2>
                        <p>Cancelled Trips</p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-6 rounded-3xl shadow-xl">
                        <IndianRupee size={45} />
                        <h2 className="text-4xl font-black mt-4">
                            ₹{((stats.totalBookings || 0) * 5000).toLocaleString()}
                        </h2>
                        <p>Revenue</p>
                    </div>

                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                    <div className="bg-slate-900 text-white px-8 py-5">
                        <h2 className="text-2xl font-bold">
                            Recent Bookings
                        </h2>
                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-100">

                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Package</th>
                                    <th className="p-4">People</th>
                                    <th className="p-4">Travel Date</th>
                                    <th className="p-4">Status</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredBookings.map((booking) => (

                                    <tr
  key={booking._id}
  className="border-b hover:bg-slate-50 transition"
>
  <td className="p-4 font-semibold">
    {booking.name}
  </td>

  <td className="p-4">
    {booking.phone}
  </td>

  <td className="p-4">
    {booking.packageName}
  </td>

  <td className="p-4">
    {booking.people}
  </td>

  <td className="p-4">
    {new Date(booking.travelDate).toLocaleDateString()}
  </td>

  <td className="p-4">
    <span
      className={`px-4 py-2 rounded-full text-sm font-bold ${
        booking.status === 'confirmed'
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {booking.status}
    </span>
  </td>
</tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Activity */}
                <div className="mt-10 bg-white rounded-3xl shadow-xl p-8">

                    <h2 className="text-2xl font-bold mb-5">
                        Recent Activity
                    </h2>

                    <div className="space-y-4">

                        <div className="p-4 bg-green-50 rounded-xl">
                            ✅ New booking received
                        </div>

                        <div className="p-4 bg-blue-50 rounded-xl">
                            🏔 Package updated
                        </div>

                        <div className="p-4 bg-red-50 rounded-xl">
                            ❌ Trip cancelled
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-xl">
                            📧 Confirmation email sent
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
