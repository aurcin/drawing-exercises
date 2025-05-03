import { ChevronDown } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';

interface CollapsibleProps {
  children: React.ReactNode;
  title: string;
}
function CollapsibleItem(props: CollapsibleProps) {
  const { children, title } = props;

  return (
    <Collapsible className='group/collapsible'>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            {title}
            <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

export default CollapsibleItem;
