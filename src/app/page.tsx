import { Sidebar } from "@/components/Sidebar/Sidebar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Tabs/Tabs";
import { Edit } from "./components/Edit";
import { View } from "./components/View";
import { Content } from "./components/Content";
export default function Home() {
  return (
    <div className="flex h-screen flex-row">
      <Sidebar>
        <Tabs defaultValue="edit" className="flex h-full w-full flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="view">View</TabsTrigger>
          </TabsList>
          <TabsContent className="flex-1 pt-5" value="edit">
            <Edit />
          </TabsContent>
          <TabsContent className="flex-1 pt-5" value="view">
            <View />
          </TabsContent>
        </Tabs>
      </Sidebar>
      <Content />
    </div>
  );
}
