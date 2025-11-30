"use client";
import React, { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const groups = [
  {
    label: "Production",
    teams: [
      { label: "wego.com.et", value: "wego" },
      { label: "omni-optimize.com", value: "omni" },
    ],
  },
  {
    label: "Staging",
    teams: [
      { label: "dev.wego.com", value: "wego-dev" },
    ],
  },
];

export default function ProjectSwitcher({ className }) {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(groups[0].teams[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("w-[200px] justify-between h-9 border-slate-200 dark:border-slate-800", className)}
        >
          <div className="flex items-center gap-2 truncate">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="truncate">{selectedTeam.label}</span>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search project..." />
            <CommandEmpty>No project found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.teams.map((team) => (
                  <CommandItem
                    key={team.value}
                    onSelect={() => {
                      setSelectedTeam(team);
                      setOpen(false);
                    }}
                    className="text-sm cursor-pointer"
                  >
                    <LayoutGrid className="mr-2 h-4 w-4 text-slate-500" />
                    {team.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTeam.value === team.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem className="cursor-pointer">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}