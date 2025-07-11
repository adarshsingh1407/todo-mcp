import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TodoTableLoading() {
  return (
    <div className="rounded-md border border-gray-600 min-h-[400px] flex flex-col overflow-hidden">
      <div className="overflow-y-auto flex-1">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800/50 sticky top-0">
              <TableHead className="text-gray-300 font-medium pl-8">
                Title
              </TableHead>
              <TableHead className="text-gray-300 font-medium text-right w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index} className="animate-pulse">
                <TableCell className="pl-8">
                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
                    <div className="h-4 bg-gray-600 rounded flex-1 max-w-[200px]"></div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <div className="h-8 w-8 bg-gray-600 rounded"></div>
                    <div className="h-8 w-8 bg-gray-600 rounded"></div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
