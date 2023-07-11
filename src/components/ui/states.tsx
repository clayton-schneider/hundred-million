import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./form";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "./button";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./command";
import { ScrollArea } from "./scroll-area";
import { CheckIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const stateNames = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const StatesSelector = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="state"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>State</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? stateNames.find((state) => state === field.value)
                    : "Select State"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search states..." />
                <CommandEmpty>No state found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-72">
                    {stateNames.map((state) => (
                      <CommandItem
                        value={state}
                        key={state}
                        onSelect={(value) => {
                          form.setValue("state", state);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            state === field.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {state}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StatesSelector;
