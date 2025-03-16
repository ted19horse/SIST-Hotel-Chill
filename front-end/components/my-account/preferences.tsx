"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, BedDouble, Utensils, Sparkles, Leaf, Bell, Mail } from "lucide-react"

export default function Preferences() {
  // Mock preferences data
  const [preferences, setPreferences] = useState({
    // Room preferences
    roomPreferences: {
      bedType: "king",
      floorPreference: "high",
      pillowType: "soft",
      roomTemperature: "cool",
      specialRequests: "Please provide extra towels and bottled water.",
    },

    // Dining preferences
    diningPreferences: {
      dietaryRestrictions: ["vegetarian"],
      allergies: "Nuts, shellfish",
      preferredDiningTime: "evening",
      tableLocation: "window",
    },

    // Communication preferences
    communicationPreferences: {
      language: "korean",
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      marketingEmails: true,
      specialOffers: true,
      newsletterFrequency: "monthly",
    },
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

  const dietaryOptions = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten-free", label: "Gluten-Free" },
    { id: "dairy-free", label: "Dairy-Free" },
    { id: "halal", label: "Halal" },
    { id: "kosher", label: "Kosher" },
  ]

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Preferences</h1>
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
            Edit Preferences
          </Button>
        )}
      </div>

      {/* Room Preferences */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center mb-4">
          <BedDouble className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-lg font-bold">Room Preferences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="bedType">Bed Type</Label>
            <Select
              disabled={!isEditing}
              value={preferences.roomPreferences.bedType}
              onValueChange={(value) =>
                setPreferences({
                  ...preferences,
                  roomPreferences: {
                    ...preferences.roomPreferences,
                    bedType: value,
                  },
                })
              }
            >
              <SelectTrigger id="bedType">
                <SelectValue placeholder="Select bed type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="king">King Size</SelectItem>
                <SelectItem value="queen">Queen Size</SelectItem>
                <SelectItem value="twin">Twin Beds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="floorPreference">Floor Preference</Label>
            <Select
              disabled={!isEditing}
              value={preferences.roomPreferences.floorPreference}
              onValueChange={(value) =>
                setPreferences({
                  ...preferences,
                  roomPreferences: {
                    ...preferences.roomPreferences,
                    floorPreference: value,
                  },
                })
              }
            >
              <SelectTrigger id="floorPreference">
                <SelectValue placeholder="Select floor preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High Floor</SelectItem>
                <SelectItem value="middle">Middle Floor</SelectItem>
                <SelectItem value="low">Low Floor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pillowType">Pillow Type</Label>
            <Select
              disabled={!isEditing}
              value={preferences.roomPreferences.pillowType}
              onValueChange={(value) =>
                setPreferences({
                  ...preferences,
                  roomPreferences: {
                    ...preferences.roomPreferences,
                    pillowType: value,
                  },
                })
              }
            >
              <SelectTrigger id="pillowType">
                <SelectValue placeholder="Select pillow type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soft">Soft</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="firm">Firm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="roomTemperature">Room Temperature</Label>
            <Select
              disabled={!isEditing}
              value={preferences.roomPreferences.roomTemperature}
              onValueChange={(value) =>
                setPreferences({
                  ...preferences,
                  roomPreferences: {
                    ...preferences.roomPreferences,
                    roomTemperature: value,
                  },
                })
              }
            >
              <SelectTrigger id="roomTemperature">
                <SelectValue placeholder="Select room temperature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cool">Cool (19-21°C)</SelectItem>
                <SelectItem value="moderate">Moderate (22-24°C)</SelectItem>
                <SelectItem value="warm">Warm (25-27°C)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="specialRequests">Special Requests</Label>
            <Textarea
              id="specialRequests"
              placeholder="Enter any special requests for your stay"
              value={preferences.roomPreferences.specialRequests}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  roomPreferences: {
                    ...preferences.roomPreferences,
                    specialRequests: e.target.value,
                  },
                })
              }
              disabled={!isEditing}
              className="resize-none h-24"
            />
          </div>
        </div>
      </div>

      {/* Dining Preferences */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center mb-4">
          <Utensils className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-lg font-bold">Dining Preferences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label className="mb-2 block">Dietary Restrictions</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dietaryOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={preferences.diningPreferences.dietaryRestrictions.includes(option.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPreferences({
                          ...preferences,
                          diningPreferences: {
                            ...preferences.diningPreferences,
                            dietaryRestrictions: [...preferences.diningPreferences.dietaryRestrictions, option.id],
                          },
                        })
                      } else {
                        setPreferences({
                          ...preferences,
                          diningPreferences: {
                            ...preferences.diningPreferences,
                            dietaryRestrictions: preferences.diningPreferences.dietaryRestrictions.filter(
                              (id) => id !== option.id,
                            ),
                          },
                        })
                      }
                    }}
                    disabled={!isEditing}
                  />
                  <Label htmlFor={option.id} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="allergies">Food Allergies</Label>
            <Textarea
              id="allergies"
              placeholder="Please list any food allergies"
              value={preferences.diningPreferences.allergies}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  diningPreferences: {
                    ...preferences.diningPreferences,
                    allergies: e.target.value,
                  },
                })
              }
              disabled={!isEditing}
              className="resize-none h-20"
            />
          </div>

          <div>
            <Label htmlFor="preferredDiningTime">Preferred Dining Time</Label>
            <Select
              disabled={!isEditing}
              value={preferences.diningPreferences.preferredDiningTime}
              onValueChange={(value) =>
                setPreferences({
                  ...preferences,
                  diningPreferences: {
                    ...preferences.diningPreferences,
                    preferredDiningTime: value,
                  },
                })
              }
            >
              <SelectTrigger id="preferredDiningTime">
                <SelectValue placeholder="Select preferred dining time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="early">Early (5:00 PM - 7:00 PM)</SelectItem>
                <SelectItem value="evening">Evening (7:00 PM - 9:00 PM)</SelectItem>
                <SelectItem value="late">Late (After 9:00 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tableLocation">Preferred Table Location</Label>
            <Select
              disabled={!isEditing}
              value={preferences.diningPreferences.tableLocation}
              onValueChange={(value) =>
                setPreferences({
                  ...preferences,
                  diningPreferences: {
                    ...preferences.diningPreferences,
                    tableLocation: value,
                  },
                })
              }
            >
              <SelectTrigger id="tableLocation">
                <SelectValue placeholder="Select preferred table location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="window">Window</SelectItem>
                <SelectItem value="corner">Corner</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="outdoor">Outdoor/Terrace</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-lg font-bold">Communication Preferences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="language">Preferred Language</Label>
            <Select
              disabled={!isEditing}
              value={preferences.communicationPreferences.language}
              onValueChange={(value) =>
                setPreferences({
                  ...preferences,
                  communicationPreferences: {
                    ...preferences.communicationPreferences,
                    language: value,
                  },
                })
              }
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

          <div>
            <Label htmlFor="newsletterFrequency">Newsletter Frequency</Label>
            <Select
              disabled={!isEditing}
              value={preferences.communicationPreferences.newsletterFrequency}
              onValueChange={(value) =>
                setPreferences({
                  ...preferences,
                  communicationPreferences: {
                    ...preferences.communicationPreferences,
                    newsletterFrequency: value,
                  },
                })
              }
            >
              <SelectTrigger id="newsletterFrequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-primary mr-2" />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-neutral-600">Receive booking confirmations and updates</p>
              </div>
            </div>
            <Switch
              checked={preferences.communicationPreferences.emailNotifications}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  communicationPreferences: {
                    ...preferences.communicationPreferences,
                    emailNotifications: checked,
                  },
                })
              }
              disabled={!isEditing}
            />
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-primary mr-2" />
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-neutral-600">Receive text messages for important updates</p>
              </div>
            </div>
            <Switch
              checked={preferences.communicationPreferences.smsNotifications}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  communicationPreferences: {
                    ...preferences.communicationPreferences,
                    smsNotifications: checked,
                  },
                })
              }
              disabled={!isEditing}
            />
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-primary mr-2" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-neutral-600">Receive mobile app notifications</p>
              </div>
            </div>
            <Switch
              checked={preferences.communicationPreferences.pushNotifications}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  communicationPreferences: {
                    ...preferences.communicationPreferences,
                    pushNotifications: checked,
                  },
                })
              }
              disabled={!isEditing}
            />
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-neutral-600">Receive promotional emails and offers</p>
              </div>
            </div>
            <Switch
              checked={preferences.communicationPreferences.marketingEmails}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  communicationPreferences: {
                    ...preferences.communicationPreferences,
                    marketingEmails: checked,
                  },
                })
              }
              disabled={!isEditing}
            />
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Leaf className="h-5 w-5 text-primary mr-2" />
              <div>
                <p className="font-medium">Special Offers</p>
                <p className="text-sm text-neutral-600">Receive notifications about special deals and packages</p>
              </div>
            </div>
            <Switch
              checked={preferences.communicationPreferences.specialOffers}
              onCheckedChange={(checked) =>
                setPreferences({
                  ...preferences,
                  communicationPreferences: {
                    ...preferences.communicationPreferences,
                    specialOffers: checked,
                  },
                })
              }
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

