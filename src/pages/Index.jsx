import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton, Heading, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import { FaPlus, FaEdit } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTransactions = [...transactions];
      updatedTransactions[editIndex] = { description, amount: parseFloat(amount) };
      setTransactions(updatedTransactions);
      setEditIndex(null);
    } else {
      setTransactions([...transactions, { description, amount: parseFloat(amount) }]);
    }
    setDescription("");
    setAmount("");
    onClose();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setDescription(transactions[index].description);
    setAmount(transactions[index].amount.toString());
    onOpen();
  };

  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <Box maxWidth="600px" margin="auto" padding="4">
      <Heading as="h1" size="xl" textAlign="center" marginBottom="8">
        Transaction Management
      </Heading>
      <Box display="flex" justifyContent="flex-end" marginBottom="4">
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
          Add Transaction
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th isNumeric>Amount</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction, index) => (
            <Tr key={index}>
              <Td>{transaction.description}</Td>
              <Td isNumeric>{transaction.amount.toFixed(2)}</Td>
              <Td>
                <IconButton icon={<FaEdit />} aria-label="Edit" onClick={() => handleEdit(index)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box marginTop="8">
        <Heading as="h2" size="lg">
          Summary
        </Heading>
        <Box fontWeight="bold">Total Amount: {totalAmount.toFixed(2)}</Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editIndex !== null ? "Edit Transaction" : "Add Transaction"}</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl marginBottom="4">
                <FormLabel>Description</FormLabel>
                <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </FormControl>
              <FormControl marginBottom="4">
                <FormLabel>Amount</FormLabel>
                <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                {editIndex !== null ? "Update" : "Add"}
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
