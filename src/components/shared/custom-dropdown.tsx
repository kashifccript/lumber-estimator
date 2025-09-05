"use client"

import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const statusOptions = ["All", "Pending", "Approved", "Rejected", "Estimator", "Contractor"]

interface StatusDropdownProps {
  value: string
  onValueChange: (value: string) => void
}

export function CustomDropdown({ value, onValueChange }: StatusDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between w-fit px-4 py-2 text-sm font-medium  bg-background rounded-[8px]   transition-colors h-[48px] border !border-[#E2624B] !text-[#E2624B] text-[16px] cursor-pointer">
        {value}
        <ChevronDown className="ml-2 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="">
        {statusOptions.map((option) => (
          <DropdownMenuItem key={option} onClick={() => onValueChange(option)} className="cursor-pointer">
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
