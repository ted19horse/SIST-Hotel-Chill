"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Camera, Save, AlertTriangle } from "lucide-react"

export default function ProfileSettings() {
  // Mock user data
  const [user, setUser] = useState({
    firstName: "Min-Ji",
    lastName: "Park",
    email: "minji.park@example.com",
    phone: "+82 10-1234-5678",
    address: "123 Sejong Street",
    city: "Seoul",
    postalCode: "04515",
    country: "South Korea",
    language: "korean",
    profileImage: "/placeholder.svg?height=200&width=200",
  })

  // Communication preferences
  const [preferences, setPreferences] = useState({
    emailMarketing: true,
    smsNotifications: true,
    appNotifications: true,
    emailReservationUpdates: true,
    emailAccountUpdates: true,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Profile & Settings</h1>
        {isEditing ? (
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white flex items-center"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving Changes
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        ) : (
          <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column - Profile Image */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-50 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src={user.profileImage || "/placeholder.svg"}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>

              <h2 className="text-xl font-bold mb-1">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-neutral-600 text-sm">{user.email}</p>

              {isEditing && (
                <div className="mt-4 w-full">
                  <Button variant="outline" className="w-full">
                    Change Profile Picture
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Personal Information */}
        <div className="lg:col-span-2">
          <div className="bg-neutral-50 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={user.city}
                  onChange={(e) => setUser({ ...user, city: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={user.postalCode}
                  onChange={(e) => setUser({ ...user, postalCode: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={user.country}
                  onChange={(e) => setUser({ ...user, country: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="language">Preferred Language</Label>
              <Select
                disabled={!isEditing}
                value={user.language}
                onValueChange={(value) => setUser({ ...user, language: value })}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="korean">한국어</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="japanese">日本語</SelectItem>
                  <SelectItem value="chinese">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-neutral-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold mb-4">Password</h3>
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div></div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-neutral-600">••••••••••••</p>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => setIsEditing(true)}
            >
              Change Password
            </Button>
          </div>
        )}
      </div>

      {/* Communication Preferences */}
      <div className="bg-neutral-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold mb-4">Communication Preferences</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Email Marketing</p>
              <p className="text-sm text-neutral-600">Receive special offers and promotions</p>
            </div>
            <Switch
              checked={preferences.emailMarketing}
              onCheckedChange={(checked) => setPreferences({ ...preferences, emailMarketing: checked })}
              disabled={!isEditing}
            />
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-neutral-600">Receive text messages for reservation updates</p>
            </div>
            <Switch
              checked={preferences.smsNotifications}
              onCheckedChange={(checked) => setPreferences({ ...preferences, smsNotifications: checked })}
              disabled={!isEditing}
            />
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">App Notifications</p>
              <p className="text-sm text-neutral-600">Receive mobile app notifications</p>
            </div>
            <Switch
              checked={preferences.appNotifications}
              onCheckedChange={(checked) => setPreferences({ ...preferences, appNotifications: checked })}
              disabled={!isEditing}
            />
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Reservation Updates</p>
              <p className="text-sm text-neutral-600">Receive emails about your reservations</p>
            </div>
            <Switch
              checked={preferences.emailReservationUpdates}
              onCheckedChange={(checked) => setPreferences({ ...preferences, emailReservationUpdates: checked })}
              disabled={!isEditing}
            />
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Account Updates</p>
              <p className="text-sm text-neutral-600">Receive emails about your account activity</p>
            </div>
            <Switch
              checked={preferences.emailAccountUpdates}
              onCheckedChange={(checked) => setPreferences({ ...preferences, emailAccountUpdates: checked })}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-red-50 rounded-lg p-6 border border-red-200">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-red-700 mb-2">Delete Account</h3>
            <p className="text-neutral-700 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button variant="destructive">Delete My Account</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

