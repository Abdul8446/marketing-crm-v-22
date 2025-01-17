import { Facebook, Instagram, Linkedin, Twitter, Hash } from 'lucide-react'

export const socialPlatforms = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    color: 'text-sky-500',
    bgColor: 'bg-sky-50',
  },
  {
    id: 'threads',
    name: 'Threads',
    icon: Hash,
    color: 'text-gray-900',
    bgColor: 'bg-gray-50',
  },
]

export type SocialPlatform = typeof socialPlatforms[number]

