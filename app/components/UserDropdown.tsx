"use client";

import Image from 'next/image';
import { User } from '@auth0/auth0-react';

interface UserDropdownProps {
  user: User;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  onLogout: (options?: { logoutParams: { returnTo: string } }) => Promise<void>;
}

export default function UserDropdown({ user, isOpen, onToggle, onLogout }: UserDropdownProps) {
  return (
    <div className="relative">
      <div 
        id="user-dropdown-trigger"
        className="flex items-center space-x-2 cursor-pointer" 
        onClick={() => onToggle(!isOpen)}
      >
        {user.picture && <Image src={user.picture} alt={user.name || 'User avatar'} width={32} height={32} className="rounded-full" />}
        {user.name && <span style={{color: '#ebdbb2'}} className="whitespace-nowrap">{user.name}</span>}
      </div>
      {isOpen && (
        <div 
          id="user-dropdown"
          className="absolute right-0 mt-2 w-48 rounded-none border-2" 
          style={{ backgroundColor: '#3c3836', borderColor: '#fe8019' }}
        >
          <button 
            onClick={() => onLogout({ logoutParams: { returnTo: typeof window !== 'undefined' ? window.location.origin : undefined } })}
            className="w-full text-left px-4 py-2 transition duration-150 hover:bg-gruvbox-yellow-transparent"
            style={{ color: '#ebdbb2' }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
} 